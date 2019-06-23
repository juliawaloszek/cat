import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../service/model/user';
import {Group} from '../../service/model/group';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTabGroup} from '@angular/material';
import {GroupService} from '../../service/group.service';
import {Observable, Subject} from 'rxjs';
import {ApplicationService} from '../../service/application.service';
import {Application} from '../../service/model/application';
import {tap} from 'rxjs/operators';
import { animateSideNav, animateSideNavContent, displayMenuText } from 'src/app/animations/animations';

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

  users$: Observable<User[]>;
  user$: Observable<User>;
  groups$: Observable<Group[]>;
  group$: Observable<Group>;
  applications$: Observable<Application[]>;
  application$: Observable<Application>;

  createNew = false;
  newUser: User;
  newGroup: Group;
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
      console.log(this.createNew);

      switch (params.name) {
        case 'groups':
          this.eligibilityTabPanel.selectedIndex = 1;
          this.initGroups(params.id);
          break;
        case 'applications':
          this.eligibilityTabPanel.selectedIndex = 2;
          this.initApplications(params.id);
          break;
        default:
          this.eligibilityTabPanel.selectedIndex = 0;
          this.initUsers(params.id);
          break;
      }
    });
  }

  private onTabChange(index) {
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

  private initUsers(id: string) {
    this.users$ = this.userService.list();

    if (id) {
      if (id === 'new') {
        this.newUser = new User();
      } else if (id === 'delete') {
        // TODO delete array of users
      } else {
        this.user$ = this.userService.read(id);
        console.log(this.user$);
      }
    }
  }

  private initGroups(id: string) {
    this.groups$ = this.groupService.list();

    if (id) {
      if (id === 'new') {
        this.newGroup = new Group();
      } else if (id === 'delete') {
        // TODO delete array of groups
      } else {
        this.group$ = this.groupService.read(id, {
          applications: true,
          users: true
        });
      }
    }
  }

  private initApplications(id: string) {
    this.applications$ = this.applicationService.list();

    if (id) {
      this.application$ = this.applicationService.read(id, {
        functionalities: true,
        privileges: true,
        users: true
      }).pipe(
        tap(response => console.log(response))
      );
    }
  }

  private deleteSelected(name: string)  {
    // TODO
  }

  onSideNavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sideNavState$.next(this.sideNavState);
  }

}
