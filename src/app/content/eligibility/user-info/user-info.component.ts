import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../service/model/user';
import {Group} from '../../../service/model/group';
import {GroupService} from '../../../service/group.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
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
    this.user$ = this.userService.read(id, true);
  }

  public save(id: string) {
    this.user$.subscribe(user => {
      const request = (id === 'new') ?
        this.userService.create(user, true) :
        this.userService.update(user, id, true);

      request.subscribe(
        response => {
          console.log('map', response);
          this.updateList.emit(response);
          return response;
        },
        errorMsg => {
          console.log('usererror', errorMsg);
          return of();
        },
        () => {
          console.log('complete');
        });
    });
  }

}
