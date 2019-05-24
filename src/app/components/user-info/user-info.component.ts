import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../service/model/user';
import {Group} from '../../service/model/group';
import {GroupService} from '../../service/group.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

  constructor(private groupService: GroupService) {
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

}
