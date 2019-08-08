import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export class Button {
  text: string;
  code: string;
  function?: any;
}

export class Config {
  title?: string;
  message: string;
  buttons?: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  buttons: Button[] = [{
    text: 'OK',
    code: 'ok',
    function: this.closeDialog
  }];

  constructor(public dialogRef: MatDialogRef<MessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.buttons) {
      this.buttons = [];

      if (typeof this.data.buttons === 'string') {
        this.data.buttons = this.data.buttons.split('/');

        this.data.buttons.forEach(button => {
          switch (button) {
            case 'yes':
              this.buttons.push({
                text: 'Tak',
                code: 'yes'
              });
              break;
            case 'no':
              this.buttons.push({
                text: 'Nie',
                code: 'no'
              });
              break;
            case 'cancel':
              this.buttons.push({
                text: 'Cancel',
                code: 'cancel'
              });
              break;
            case 'ok':
              this.buttons.push({
                text: 'OK',
                code: 'ok'
              });
              break;
          }
        });
      } else {
        this.buttons = this.data.buttons;
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
