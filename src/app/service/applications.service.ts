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

  getApplications(type: string): Observable<Application[]> {
    if (type !== '') {
      return of(APPS.filter(application => application.type === type));
    } else {
      return of(APPS);
    }
  }

  setActive(application: Application): void {
    this.activeApplication = application;
  }

  getActive(): Application {
    return this.activeApplication;
  }
}
