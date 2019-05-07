import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../service/class/user';
import {Group} from '../../service/class/group';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user: User;
  private allGroups: Group[];

  constructor() { }

  ngOnInit() {
  }

  private onRemoveGroup(group) {

  }

  private onGroupOptionSelected(event) {

  }

}
