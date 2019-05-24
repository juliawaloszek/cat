import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../service/model/group';
import {Application} from '../../../service/model/application';
import {Observable} from 'rxjs';
import {GroupService} from '../../../service/group.service';
import {catchError, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit {
  @Input() group: Group;
  applications$: Observable<Application[]>;

  constructor(private groupService: GroupService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id && params.id !== 'new') {
        this.applications$ = this.groupService.applications(this.group.id, {
          functionalities: true,
          privileges: true
        });
      }
    });
  }

  onAddUsersButton() {
    // TODO dodaj użytkowników
  }

  onRemoveUsersButton() {
    // TODO usuń użytkowników
  }

  onAddApplicationsButton() {
    // TODO dodaj aplikacje
  }

  onRemoveApplicationsButton() {
    // TODO usuń aplikacje
  }

}
