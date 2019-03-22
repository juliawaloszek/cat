import { Injectable } from '@angular/core';
import { APPS } from './mock/applications';
import { Application } from './class/application';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApplicationsService {
  active = null;

  constructor() { }

  public getApplications(type: string): Observable<Application[]> {
    if (type !== '') {
      return of(APPS.filter(application => application.type === type));
    } else {
      return of(APPS);
    }
  }

  public getApplication(id: string): Observable<Application> {
    return of(APPS.find(application => application.id === id));
  }

  public setActive(application: Application): void {
    this.active = application;
  }

  public getActive(): Application {
    return this.active;
  }
}
