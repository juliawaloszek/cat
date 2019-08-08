import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../service/model/user';
import { Group } from '../../service/model/group';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material';
import { GroupService } from '../../service/group.service';
import { Subject } from 'rxjs';
import { ApplicationService } from '../../service/application.service';
import { Application } from '../../service/model/application';
import { animateSideNav, animateSideNavContent, displayMenuText } from 'src/app/animations/animations';
import { GroupInfoComponent } from './group-info/group-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss'],
  animations: [
    animateSideNav,
    animateSideNavContent,
    displayMenuText]
})

export class EligibilityComponent implements OnInit {
  @ViewChild('eligibilityTabPanel') eligibilityTabPanel: MatTabGroup;
  @ViewChild('userData') userDataPanel: UserInfoComponent;
  @ViewChild('groupData') groupDataPanel: GroupInfoComponent;
  @ViewChild('appData') appDataPanel: ApplicationInfoComponent;

  private filterUsers = '';
  private filterGroups = '';
  private params: any = {};

  users: User[];
  groups: Group[];
  applications: Application[];

  sideNavState$: Subject<boolean> = new Subject();
  sideNavState = false;
  linkText = false;

  constructor(private userService: UserService,
              private groupService: GroupService,
              private applicationService: ApplicationService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;

      switch (params.name) {
        case 'groups':
          this.eligibilityTabPanel.selectedIndex = 1;
          this.groupService.list().subscribe(
            list => this.groups = list
          );
          break;
        case 'applications':
          this.eligibilityTabPanel.selectedIndex = 2;
          this.applicationService.list().subscribe(
            list => this.applications = list
          );
          break;
        default:
          this.eligibilityTabPanel.selectedIndex = 0;
          this.userService.list().subscribe(
            list => this.users = list
          );
          break;
      }
    });
  }

  private onTabChange(index) {
    console.log(this.eligibilityTabPanel);
    switch (index) {
      case 0:
        this.router.navigate(['/eligibility/users']);
        break;
      case 1:
        this.router.navigate(['/eligibility/groups']);
        break;
      case 2:
        this.router.navigate(['/eligibility/applications']);
        break;
    }
  }

  private updateList(config)  {
    switch (this.params.name) {
      case 'groups':
        this.groupService.list(true).subscribe(
          list => this.groups = list
        );
        break;
      case 'users':
        this.userService.list(true).subscribe(
          list => {
            console.log(list);
            this.users = list;
          }
        );
        break;
    }

    if (config.redirect) {
      this.router.navigate(['/eligibility/' + this.params.name
        + (config.id ? '/' + config.id : '')]);
    }
  }

  onSaveButtonClick() {
    switch (this.params.name) {
      case 'groups':
        this.groupDataPanel.save(this.params.id);
        break;
      case 'applications':
        this.appDataPanel.save(this.params.id);
        break;
      default:
        this.userDataPanel.save(this.params.id);
        break;
    }
  }

  onCancelButtonClick() {
    switch (this.params.name) {
      case 'groups':
        this.groupDataPanel.cancel(this.params.id);
        break;
      case 'applications':
        this.appDataPanel.cancel(this.params.id);
        break;
      default:
        this.userDataPanel.cancel(this.params.id);
        break;
    }
  }

  private deleteSelected() {
    if (this.params.id) {
      switch (this.params.name) {
        case 'groups':
          this.groupDataPanel.deleteItem(this.params.id);
          break;
        case 'users':
          this.userDataPanel.deleteItem(this.params.id);
          break;
      }
    }
  }

  disableApp(application) {
    return !(application.functionalities && application.functionalities.functionality);
  }

  onSideNavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sideNavState$.next(this.sideNavState);
  }

  searchInObject(object, value): boolean {
    const me = this;

    return !!Object.keys(object).find(key => {
      if (Array.isArray(object[key])) {
        return false;
      } else {
        switch (typeof object[key]) {
          case 'object':
            return me.searchInObject(object[key], value);
          case 'boolean':
            return false;
          default:
            const keyValue = typeof object[key] === 'string' ?
              object[key].toLowerCase() :
              object[key].toString();

            return keyValue.indexOf(value) !== -1;
        }
      }
    });
  }

}
