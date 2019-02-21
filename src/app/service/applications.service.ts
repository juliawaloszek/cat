import { Injectable } from '@angular/core';
import { APPS } from './mock/applications';
import { Application } from './class/application';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  activeApplication = null;

  constructor() { }

  getApplications(): Observable<Application[]> {
    return of(APPS);
  }

  setActive(application: Application): void {
    this.activeApplication = application;
  }

  getActive(): Application {
    return this.activeApplication;
  }
}
