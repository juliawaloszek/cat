import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

import { Application } from './model/application';
import { Plugin } from './model/plugin';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  private httpOptions = {
    withCredentials: true // necessary for dev version
  };
  private config = {
    functionalities: true,
    privileges: true,
    users: true,
    groups: true
  };

  private applicationsCache$: Observable<Application[]>;
  private baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = (isDevMode() ? 'https://vm-kajko:8181' : '') + '/setup/applications/';
  }

  public list(): Observable<Application[]> {
    if (!this.applicationsCache$) {
      this.applicationsCache$ = this.http.get<{application}>(this.baseUrl, this.httpOptions).pipe(
        map(applications => applications.application
          .sort((appA, appB) => appB.name.toLowerCase() > appA.name.toLowerCase() ? -1 : 1)),
        catchError(this.handleError<Plugin[]>('getApplications', [])),
        shareReplay()
      );
    }
    return this.applicationsCache$;
  }

  public read(id: string, addConfig?: boolean): Observable<Application> {
    const options = Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);

    return this.http.get<Application>(this.baseUrl + id, options).pipe(
      map(application => {
        application.functionalities.functionality = application.functionalities.functionality
          .sort((funcA, funcB) => funcB.name.toLowerCase() > funcA.name.toLowerCase() ? -1 : 1);
        return application;
      }));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }
}
