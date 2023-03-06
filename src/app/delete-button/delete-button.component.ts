import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteButtonDialogComponent } from '../delete-button-dialog/delete-button-dialog.component';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  constructor(public dialog: MatDialog) { }
  @Input() id!: string;
  @Input() type!: string;
  @Input() name!: string

  openDialog(): void {
    this.dialog.open(DeleteButtonDialogComponent, {
      width: '250px',
      data: {
        id: this.id,
        type: this.type,
        name: this.name
      }
    });
  }
}

