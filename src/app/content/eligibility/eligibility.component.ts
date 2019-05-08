import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../service/class/user';
import {Group} from '../../service/class/group';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {MatTab, MatTabChangeEvent, MatTabGroup} from '@angular/material';
import {NAVLINKS} from './navlinks';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityComponent implements OnInit {
  @ViewChild('eligibilityTabPanel') eligibilityTabPanel: MatTabGroup;
  users: User[];
  user: User;
  groups: Group[];
  group: Group;

  constructor(private userService: UserService,
              private groupService: GroupService,
              private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      switch (params.name) {
        case 'group':
          this.eligibilityTabPanel.selectedIndex = 1;
          this.initGroups();
          break;
        case 'applications':
          this.eligibilityTabPanel.selectedIndex = 2;
          break;
        default:
          this.eligibilityTabPanel.selectedIndex = 0;
          this.initUsers();
          break;
      }
    });
  }

  private initUsers() {
    const id = this.route.snapshot.paramMap.get('id');

    this.userService.users.subscribe(users => {
      this.users = users;

      if (id) {
        this.user = users.find(user => user.id === id);
      }
    });
  }

  private initGroups() {
    const id = this.route.snapshot.paramMap.get('id');

    this.groupService.groups.subscribe(groups => {
      this.groups = groups;
      console.log(groups);
      if (id) {
        this.group = groups.find(group => group.id === id);
      }
    });
  }

  private initApplications() {

  }

  private onTabChange(event) {
    switch (event.index) {
      case 0:
        this.initUsers();
        break;
      case 1:
        this.initGroups();
        break;
      case 2:
        break;
    }
    console.log(event);
  }

}
