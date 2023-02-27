import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditVenueComponent } from '../edit-venue/edit-venue.component';

@Component({
  selector: 'app-edit-venue-dialog',
  templateUrl: './edit-venue-dialog.component.html',
  styleUrls: ['./edit-venue-dialog.component.css']
})
export class EditVenueDialogComponent {
  @Input() id!: string;
  @Input() type!: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditVenueComponent, {

      data: {
        id: this.id,
      }
    });
  }
}