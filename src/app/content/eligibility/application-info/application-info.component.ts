import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../../service/model/application';
import { Group } from '../../../service/model/group';
import { User } from '../../../service/model/user';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ApplicationService} from '../../../service/application.service';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {
  @Input() application: Application;

  application$: Observable<Application>;
  groups: Group[] = [];
  users: User[] = [];

  constructor(private applicationService: ApplicationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.application$ = this.applicationService.read(params.id, true);

      this.application$.subscribe((application => {
        console.log(application);
      }));
    });
  }

  public cancel(id: string) {
    this.applicationService.cancel(id).subscribe(response => {
      if (response) {
        this.application$ = response;
      }
    });
  }

  public save(id: string) {
    this.application$.subscribe(application =>
      this.applicationService.save(application, true, id).subscribe());
  }

}
