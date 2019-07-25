import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Group} from '../../../service/model/group';
import {MatDialog} from '@angular/material';
import {GroupService} from '../../../service/group.service';
import {SimpleTableComponent} from '../../../components/simple-table/simple-table.component';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AppSource} from '../model/app-source';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})

export class GroupInfoComponent implements OnInit {
  @Output() updateList = new EventEmitter<any>();

  private group$: Observable<Group>;
  private appsData: AppSource;

  constructor(private groupService: GroupService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.group$ = this.groupService.read(params.id, true);

      this.group$.subscribe(group => {
        this.appsData = new AppSource(group.applications.application);
      });
    });
  }

  updateUserList(value) {
    this.group$.subscribe(group => group.user = value);
  }

  public cancel(id: string) {
    this.groupService.cancel(id).subscribe(response => {
      if (response) {
        this.group$ = response;
      }
    });
  }

  public save(id: string) {
    this.group$.subscribe(group => {
      this.groupService.save(group, true, id).subscribe(newGroup => {
        this.updateList.emit(id !== 'new' ? {
          redirect: true,
          id: newGroup.id
        } : {});
      });
    });
  }

  public deleteItem(id: string) {
    return this.groupService.delete(id).subscribe(response => {
      response.subscribe(() => this.updateList.emit({
        redirect: true
      }));
    });
  }

}
