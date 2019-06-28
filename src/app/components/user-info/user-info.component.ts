import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../service/model/user';
import {Group} from '../../service/model/group';
import {GroupService} from '../../service/group.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith, tap} from 'rxjs/operators';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user: User;

  private groups$: Observable<Group[]>;
  private groupControl = new FormControl();
  private filteredGroups: Observable<Group[]>;

  constructor(private userService: UserService,
              private groupService: GroupService) {

    this.filteredGroups = this.groupControl.valueChanges.pipe(
      // map((value: string | null) => value ? this.filterGroups(value) : this.groups$.slice())
    );
  }

  ngOnInit() {
    this.groups$ = this.groupService.groups;
  }

  private onRemoveGroup(group) {

  }

  private onGroupOptionSelected(event) {

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
    const request = id === 'new' ? this.userService.create(this.user) : this.userService.update(this.user);

    request.pipe(
      map(response => {
        console.log('map', response);
        return response;
      }),
      catchError(error => {
        console.log('usererror', error);
        return of();
      })
    );

    //   .subscribe(
    // value => {
    //   console.log('success', value);
    // },
    // error => {
    //   console.log('error', error);
    // },
    // () => {
    //   console.log('complete');
    // });
  }

}
