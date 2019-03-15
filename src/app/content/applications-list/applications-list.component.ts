import {Component, OnInit} from '@angular/core';
import {Application} from '../../service/class/application';
import {ApplicationsService} from '../../service/applications.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {
  applications: Application[];

  constructor(private applicationsService: ApplicationsService) {
  }

  ngOnInit() {
    this.getApplications();
    console.log(this.applications);
  }

  onTileClick(application: Application): void {
    // this.applicationsService.setActive(application);
    if (application.url) {
      window.open(application.url);
    }

    console.log('Aplikacja powinna zawierać url\'a pod którym można ją otworzyć.');
  }

  getApplications(): void {
    this.applicationsService.getApplications('application')
      .subscribe(applications => this.applications = applications);
  }

}
