
import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { WebsocketService, Gig } from '../websocket.service';

export interface EditData {
  id: string;
  type: string;
  name: string;
}

@Component({
  selector: 'app-delete-button-dialog',
  templateUrl: './delete-button-dialog.component.html',
  styleUrls: ['./delete-button-dialog.component.css']
})
export class DeleteButtonDialogComponent implements OnInit{
  gig: Gig | null = null
  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData, public dialogRef: MatDialogRef<DeleteButtonComponent>, private WebsocketService: WebsocketService) {

  }

  ngOnInit(): void {
    this.gig = this.WebsocketService.inUse(this.data.id, this.data.type)
  }

  delete() {
    if (this.gig != null) {
      return
    }
    console.log("DELETE", this.data)
    this.dialogRef.close()
    const m = this.WebsocketService.emptyMessage('del')
    m.delete = {
      type: this.data.type,
      id: this.data.id
    }
    this.WebsocketService.messages.next(m)
  }
}
