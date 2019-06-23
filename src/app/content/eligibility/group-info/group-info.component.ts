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

  constructor(public dialog: MatDialog,
              private userService: UserService) { }

  ngOnInit() {
  }

  onAddUsersButton() {
    this.userService.list().subscribe(users => {
      users = users.filter(user => !this.group.user.some(gUser => user.id === gUser.id));

      const dialogRef = this.createDialog({
        list: users,
        userLabel: true,
        dialogTitle: 'Dodaj użytkowników'
      });

      dialogRef.afterClosed().subscribe(result => {
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

  createDialog(data: object) {
    return this.dialog.open(InterpolateDialogComponent, {
      width: '350px',
      height: '50%',
      data: data
    });
  }

}
