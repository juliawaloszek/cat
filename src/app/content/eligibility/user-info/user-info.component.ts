import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../service/model/user';
import {Group} from '../../../service/model/group';
import {GroupService} from '../../../service/group.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {UserService} from '../../../service/user.service';
import {AppSource} from '../model/app-source';
import {GroupSource} from '../model/group-source';
import {ActivatedRoute} from '@angular/router';
import {error} from 'util';
import {errorObject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Output() updateList = new EventEmitter<any>();

  private user$: Observable<User>;
  private optionsControl = new FormControl();
  private departments: string[];
  private appSource: AppSource;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user$ = this.userService.read(params.id, true);
      this.user$.subscribe(user => {
        this.appSource = new AppSource(user.applications.application);
        this.userService.departments().subscribe(departments => {
          this.departments = departments;
        });
      });
    });
  }

  private updateGroupList(value) {
    this.user$.subscribe(user => user.group = value);
  }

  public cancel(id: string) {
    this.userService.cancel(id).subscribe(response => {
      if (response) {
        this.user$ = response;
      }
    });
  }

  public save(id: string) {
    this.user$.subscribe(user => {
      this.userService.save(user, true, id).subscribe(newUser => {
        this.updateList.emit(id !== 'new' ? {
          redirect: true,
          id: newUser.id
        } : {});
      });
      // póki co zostawiam dla pamięci, co by pamiętać jak się dostac do odpowiedzi o zapisie
      // nie do końca jest to możliwe tak jak przy usunięciu, ponieważ przed operacją musi pobrać
      // model użytkownika
      // request.subscribe(response => response.subscribe(() => this.updateList.emit());
    });
  }

  public deleteItem(id: string) {
    return this.userService.delete(id).subscribe(response => {
      response.subscribe(() => this.updateList.emit({
        redirect: true
      }));
    });
  }

}
