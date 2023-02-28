import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AddOptionComponent } from '../add-option/add-option.component';

@Component({
  selector: 'app-add-option-dialog',
  templateUrl: './add-option-dialog.component.html',
  styleUrls: ['./add-option-dialog.component.css']
})
export class AddOptionDialogComponent {
  @Input() id!: string;
  @Input() type!: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddOptionComponent, {
      data: {
        id: this.id,
      }
    });
  }
}
