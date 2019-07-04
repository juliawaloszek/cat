import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../service/model/group';
import {MatDialog} from '@angular/material';
import {InterpolateDialogComponent} from '../interpolate-dialog/interpolate-dialog.component';
import {UserService} from '../../../service/user.service';
import {GroupService} from '../../../service/group.service';
import {SimpleTableComponent} from '../../../components/simple-table/simple-table.component';
import {catchError, map} from 'rxjs/operators';
import {ApplicationService} from '../../../service/application.service';
import {of} from 'rxjs';
import {UserSource} from '../model/user-source';
import {AppSource} from '../model/app-source';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})

export class GroupInfoComponent implements OnInit {
  @ViewChild('userTable') userTable: SimpleTableComponent;
  @Input() group: Group;

  private usersData: UserSource;
  private appsData: AppSource;

  constructor(private dialog: MatDialog,
              private groupService: GroupService,
              private userService: UserService,
              private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.usersData = new UserSource(this.group.user);
    this.appsData = new AppSource(this.group.applications.application || []);
  }

  onAddUsersButton() {
    this.userService.list().subscribe(users => {
      users = users.filter(user => !this.group.user.some(gUser => user.id === gUser.id));

      const dialogRef = this.createDialog({
        list: Object.assign(this.usersData, {
          data: users
        }),
        dialogTitle: 'Dodaj użytkowników'
      }, '500px');

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          result.forEach(user => {
            this.group.user.push(user);
          });

          this.userTable.getDataSource().loadData(this.group.user);
        }
      });
    });
  }

  onRemoveUsersButton() {
    this.userTable.removeSelection();
  }

  onAddApplicationsButton() {
    // TODO dodaj aplikacje
  }

  onRemoveApplicationsButton() {
    // TODO usuń aplikacje
  }

  createDialog(data: object, width: string = '350px') {
    return this.dialog.open(InterpolateDialogComponent, {
      width, height: '50%', data
    });
  }

  public save(id: string) {
    const request = (id === 'new') ? this.groupService.create(this.group) : this.groupService.update(this.group, id);

    request.subscribe(
      response => {
        console.log('map', response);
        return response;
      },
      error => {
        console.log('grouperror', error);
        return of();
      },
      () => {
        console.log('complete');
      });
  }

}
