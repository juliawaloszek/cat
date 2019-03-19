import { Component, OnInit, ViewChild } from '@angular/core';
import { Application } from '../../service/class/application';
import { ApplicationsService } from '../../service/applications.service';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-configurators-list',
  templateUrl: './configurators-list.component.html',
  styleUrls: ['./configurators-list.component.scss']
})

export class ConfiguratorsListComponent implements OnInit {
  @ViewChild('appSection') section: MatSidenav;
  applications: Application[];
  activeApp: Application;

  constructor(
    private applicationsService: ApplicationsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getApplications();
    this.route.params.subscribe(params => {
      console.log(params);
      this.getApplication();
    });
  }

  getApplication(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.applicationsService.getApplication(id)
      .subscribe(application => this.activeApp = application);
  }

  getApplications(): void {
    this.applicationsService.getApplications('configuration')
      .subscribe(applications => this.applications = applications);
  }
}
