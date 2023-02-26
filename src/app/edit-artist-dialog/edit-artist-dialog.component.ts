import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditArtistComponent } from '../edit-artist/edit-artist.component';

@Component({
  selector: 'app-edit-artist-dialog',
  templateUrl: './edit-artist-dialog.component.html',
  styleUrls: ['./edit-artist-dialog.component.css']
})
export class EditArtistDialogComponent {
  @Input() id!: string;
  @Input() type!: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditArtistComponent, {
      data: {
        id: this.id,
      }
    });
  }
}