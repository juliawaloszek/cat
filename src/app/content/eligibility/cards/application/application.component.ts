import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../../service/model/application';

@Component({
  selector: 'app-application-card',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  @Input() application: Application;


  constructor() {
  }

  ngOnInit() {
    console.log(this.application);
  }

  selected(item) {
    console.log(item);
  }

  expand(event) {
    console.log(event);
  }

}
