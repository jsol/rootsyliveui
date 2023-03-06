import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTemplateComponent } from '../edit-template/edit-template.component';

@Component({
  selector: 'app-edit-template-dialog',
  templateUrl: './edit-template-dialog.component.html',
  styleUrls: ['./edit-template-dialog.component.css']
})
export class EditTemplateDialogComponent {
  @Input() id!: string;
  @Input() type!: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditTemplateComponent, {
      data: {
        id: this.id,
      }
    });
  }
}