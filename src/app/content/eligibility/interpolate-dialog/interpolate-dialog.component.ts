import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-interpolate-dialog',
  templateUrl: './interpolate-dialog.component.html',
  styleUrls: ['./interpolate-dialog.component.scss']
})

export class InterpolateDialogComponent implements OnInit {
  checkedObjects: any;

  constructor(public dialogRef: MatDialogRef<InterpolateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }

  selectionChanged(newSelection: any) {
    this.checkedObjects = newSelection;
  }

}
