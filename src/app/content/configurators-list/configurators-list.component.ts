import { Component, OnInit } from '@angular/core';
import { Application } from '../../service/class/application';
import { ApplicationsService } from '../../service/applications.service';

@Component({
  selector: 'app-configurators-list',
  templateUrl: './configurators-list.component.html',
  styleUrls: ['./configurators-list.component.scss']
})

export class ConfiguratorsListComponent implements OnInit {
  applications = [];

  constructor( private applicationsService: ApplicationsService ) { }

  ngOnInit() {
    this.getApplications();
  }

  onSelect( application: Application ): void {
    this.applicationsService.setActive(application);
  }

  getApplications(): void {
    this.applicationsService.getApplications('configuration')
      .subscribe(applications => this.applications = applications);
  }
}
