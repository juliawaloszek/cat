import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../service/model/user';
import { Group } from '../../service/model/group';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material';
import { GroupService } from '../../service/group.service';
import { Observable, Subject } from 'rxjs';
import { ApplicationService } from '../../service/application.service';
import { Application } from '../../service/model/application';
import {merge, tap} from 'rxjs/operators';
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
  private params: any = {};

  users: User[];
  groups: Group[];
  applications: Application[];

  createNew = false;
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
      this.createNew = params.id === 'new';
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

  private deleteSelected() {
    this.route.params.subscribe(params => {
      if (params.id) {
        switch (params.name) {
          case 'groups':
            this.groupService.delete(params.id).subscribe(() => {
              this.router.navigate(['/eligibility/groups']);
            });
            break;
          case 'users':
            this.userService.delete(params.id).subscribe(() => {
              this.router.navigate(['/eligibility/users']);
            });
            break;
        }
      }
    });
  }

  private updateList()  {
    this.route.params.subscribe(params => {
      switch (params.name) {
        case 'groups':
          this.groupService.list().subscribe(
            list => this.groups = list
          );
          break;
        case 'users':
          this.userService.list().subscribe(
            list => this.users = list
          );
          break;
      }
    });
  }

  onSaveButtonClick() {
    let dataPanel;
    switch (this.params.name) {
      case 'groups':
        dataPanel = this.groupDataPanel;
        break;
      case 'applications':
        dataPanel = this.appDataPanel;
        break;
      default:
        dataPanel = this.userDataPanel;
        break;
    }

    dataPanel.save(this.params.id);
  }

  onCancelButtonClick() {
    let dataPanel;
    switch (this.params.name) {
      case 'groups':
        dataPanel = this.groupDataPanel;
        break;
      case 'applications':
        dataPanel = this.appDataPanel;
        break;
      default:
        dataPanel = this.userDataPanel;
        break;
    }

    dataPanel.cancel(this.params.id);
  }

  onSideNavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sideNavState$.next(this.sideNavState);
  }

  closedStart(sideNavId) {
    console.log('user sidenav close');
    console.log('sidenav', this[sideNavId]);

    // to nie działa
    // this[sideNavId].open();

  }

}
