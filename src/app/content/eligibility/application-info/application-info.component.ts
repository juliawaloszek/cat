import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../../service/model/application';
import { Group } from '../../../service/model/group';
import { User } from '../../../service/model/user';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {
  @Input() application: Application;
  private groups: Group[] = [];
  private users: User[] = [];

  constructor() { }

  ngOnInit() {
  }

}
