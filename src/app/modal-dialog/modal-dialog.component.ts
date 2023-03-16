import {Component, Inject, Input, NgModule} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {

  dataValues;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, public dialogRef: MatDialogRef<ModalDialogComponent>) { this.dataValues = data; }
  
  ngOnInit() {}
}
