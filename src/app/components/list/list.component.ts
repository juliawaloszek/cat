import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Application} from '../../service/class/application';
import {ApplicationsService} from '../../service/applications.service';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // @ViewChild('sidenavMenu') sidenav: MatSidenav;
  @Input() type: string;
  applications: Application[];

  constructor(private applicationsService: ApplicationsService, private router: Router) {
  }

  ngOnInit() {
    this.applicationsService.plugins.subscribe(applications => this.applications = applications);
  }

  onSelect(application: Application): void {
    // this.sidenav.close();

    if (application.url) {
      if (application.type === 'application') {
        window.open(application.url);
      } else {
        this.router.navigate(['/configuration/' + application.id]);
      }
    }
  }

}
