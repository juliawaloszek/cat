import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../service/model/group';
import {MatDialog} from '@angular/material';
import {InterpolateDialogComponent} from '../interpolate-dialog/interpolate-dialog.component';
import {UserService} from '../../../service/user.service';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, pipe} from 'rxjs';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})

export class GroupInfoComponent implements OnInit {
  @Input() group: Group;

  private group$: Observable<Group>;
  private usersData: any;
  private appsData: any;

  constructor(public dialog: MatDialog,
              private userService: UserService) { }

  ngOnInit() {
    console.log(this.group);

    this.usersData = {
      data: this.group.user,
      checkColumn: true,
      columns: [{
        dataIndex: 'name',
        header: 'Imię i Nazwisko',
        mapping: 'full'
      }, {
        dataIndex: 'departament',
        header: 'Wydział'
      }]
    };
    console.log('usersData', this.usersData);

    this.appsData = {
      data: this.group.applications.application,
      checkColumn: true,
      columns: [{
        dataIndex: 'name',
        header: 'Nazwa'
      }]
    };
    console.log('appsData', this.appsData);
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
        console.log('result', result);
        if (result) {
          result.forEach(user => {
            this.group.user.push(user);
          });
          // może na odświeżanie tej tabeli pomoże zmiana elementu na observable
          console.log(this.group.user);
        }
      });
    });
  }

  onRemoveUsersButton() {
    // TODO usuń użytkowników
  }

  onAddApplicationsButton() {
    // TODO dodaj aplikacje
  }

  onRemoveApplicationsButton() {
    // TODO usuń aplikacje
  }

  createDialog(data: object, width: string = '350px') {
    return this.dialog.open(InterpolateDialogComponent, {
      width,
      height: '50%',
      data
    });
  }

}
