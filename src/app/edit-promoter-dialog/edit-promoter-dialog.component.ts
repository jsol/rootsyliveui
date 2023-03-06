import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPromoterComponent } from '../edit-promoter/edit-promoter.component';

@Component({
  selector: 'app-edit-promoter-dialog',
  templateUrl: './edit-promoter-dialog.component.html',
  styleUrls: ['./edit-promoter-dialog.component.css']
})
export class EditPromoterDialogComponent {
  @Input() id!: string;
  @Input() type!: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditPromoterComponent, {
      data: {
        id: this.id,
      }
    });
  }
}