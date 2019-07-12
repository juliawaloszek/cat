import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../service/model/group';
import {MatDialog} from '@angular/material';
import {GroupService} from '../../../service/group.service';
import {SimpleTableComponent} from '../../../components/simple-table/simple-table.component';
import {map} from 'rxjs/operators';
import {of} from 'rxjs';
import {AppSource} from '../model/app-source';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})

export class GroupInfoComponent implements OnInit {
  @ViewChild('userTable') userTable: SimpleTableComponent;
  @Input() group: Group;

  private appsData: AppSource;

  constructor(private dialog: MatDialog,
              private groupService: GroupService) {
  }

  ngOnInit() {
    this.appsData = new AppSource(this.group.applications.application || []);
  }

  public save(id: string) {
    const request = (id === 'new') ? this.groupService.create(this.group) : this.groupService.update(this.group, id);

    request.subscribe(
      response => {
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
  }

}
