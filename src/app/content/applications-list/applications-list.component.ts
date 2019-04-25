import { Component, OnInit } from '@angular/core';
import { Application } from '../../service/class/application';
import { ApplicationsService } from '../../service/applications.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {
  applications: Application[];
  activeApp: Application;

  constructor(private applicationsService: ApplicationsService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getApplications();
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.getApplication();
      }
    });
    console.log(this.applications);
  }

  onTileClick(application: Application): void {
    if (application.url) {
      window.open(window.location.protocol + '//' + window.location.hostname + application.url);
    }

    console.log('Aplikacja powinna zawierać url\'a pod którym można ją otworzyć.');
  }

  getApplication(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.applicationsService.plugins.subscribe((application) => {
      this.activeApp = application.find(app => app.id === id);
    });
  }

  getApplications(): void {
    this.applicationsService.plugins.subscribe(applications => this.applications = applications);
  }

}
