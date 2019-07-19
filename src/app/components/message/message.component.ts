import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export class Button {
  text: string;
  function: void;
}

export class Config {
  title?: string;
  message: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() buttons: Button[] = [{
    text: 'OK',
    function: this.closeDialog()
  }];

  constructor(public dialogRef: MatDialogRef<MessageComponent>,
              @Inject(MAT_DIALOG_DATA) public config: Config) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
