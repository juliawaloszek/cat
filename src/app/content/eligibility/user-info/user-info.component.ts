import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../service/model/user';
import {Group} from '../../../service/model/group';
import {GroupService} from '../../../service/group.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../../../service/user.service';
import {AppSource} from '../model/app-source';
import {GroupSource} from '../model/group-source';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user: User;
  @Output() updateList = new EventEmitter<any>();

  private groups$: Observable<Group[]>;
  private appSource: AppSource;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (this.user) {
      this.user.group = this.user.group || [];
      this.appSource = new AppSource(this.user.applications || []);
    }
  }

  private filterGroups(value: string, caseSensitive = false): Observable<Group[]> {
    if (caseSensitive) {
      value = value.toLowerCase();
    }

    return this.groups$.pipe(
      map(groups => groups.filter(group => {
        return caseSensitive ? group.name === value : group.name.toLowerCase() === value.toLowerCase();
      }))
    );
  }

  public save(id: string) {
    const request = (id === 'new') ?
      this.userService.create(this.user, true) :
      this.userService.update(this.user, id, true);

    request.subscribe(
      response => {
        console.log('map', response);
        this.updateList.emit(response);
        return response;
      },
      error => {
        console.log('usererror', error);
        return of();
      },
      () => {
        console.log('complete');
      });
  }

}
