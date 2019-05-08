import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../service/class/user';
import {Group} from '../../service/class/group';
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
  private groups: Group[];
  private groupControl = new FormControl();
  private filteredGroups: Observable<Group[]>;

  constructor(private groupService: GroupService) {
    this.filteredGroups = this.groupControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this.filterGroups(value) : this.groups.slice())
    );
  }

  ngOnInit() {
    this.groupService.groups.subscribe(groups => {
      this.groups = groups;
    });
  }

  private onRemoveGroup(group) {

  }

  private onGroupOptionSelected(event) {

  }

  private filterGroups(value: string, caseSensitive = false): Group[] {
    if (caseSensitive) {
      value = value.toLowerCase();
    }

    return this.groups.filter(group => {
      let groupName = group.name;
      if (caseSensitive) {
        groupName = groupName.toLowerCase();
      }
      return groupName.indexOf(value) === 0;
    });
  }

}
