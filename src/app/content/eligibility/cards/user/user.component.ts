import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { SimpleTableComponent } from '../../../../components/simple-table/simple-table.component';
import { UserSource } from '../../model/user-source';
import { User } from '../../../../service/model/user';
import { UserService } from '../../../../service/user.service';
import { MatDialog } from '@angular/material';
import { InterpolateDialogComponent } from '../../interpolate-dialog/interpolate-dialog.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('table') userTable: SimpleTableComponent;
  @Output() updateList = new EventEmitter<any>();
  @Input() users: User[];
  private userSource: UserSource;

  constructor(private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.userSource = new UserSource(this.users);
  }

  onAddUsersButton() {
    this.userService.list().subscribe(users => {
      users = users.filter(user => !this.users.some(oUser => user.id === oUser.id));

      const dialogRef = this.createDialog({
        list: Object.assign(this.userSource, {
          data: users
        }),
        dialogTitle: 'Dodaj użytkowników'
      }, '500px');

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          result.forEach(user => {
            this.users.push(user);
          });

          this.userTable.getDataSource().loadData(this.users);
        }
      });
    });
  }

  onRemoveUsersButton() {
    this.updateList.emit(this.userTable.removeSelection());
  }

  createDialog(data: object, width: string = '350px') {
    return this.dialog.open(InterpolateDialogComponent, {
      width, height: '50%', data
    });
  }

}
