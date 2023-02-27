import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditgigComponent } from '../editgig/editgig.component';

@Component({
  selector: 'app-edit-gig-dialog',
  templateUrl: './edit-gig-dialog.component.html',
  styleUrls: ['./edit-gig-dialog.component.css']
})
export class EditGigDialogComponent {
  @Input() id!: string;
  @Input() type!: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditgigComponent, {

      data: {
        id: this.id,
      }
    });
  }
}