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
    this.group$ = this.groupService.read(id, true);
  }

  public save(id: string) {
    this.group$.subscribe(group => {
      const request = (id === 'new') ?
        this.groupService.create(group, true) :
        this.groupService.update(group, id, true);

      request.subscribe(
        response => {
          this.updateList.emit(response);
          console.log('map', response);
          return response;
        },
        error => {
          console.log('grouperror', error);
          return of();
        },
        () => {
          console.log('complete');
        });
    });
  }

}
