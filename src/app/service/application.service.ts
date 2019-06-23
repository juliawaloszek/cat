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

  private applicationsCache$: Observable<Application[]>;
  private baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = (isDevMode() ? 'https://vm-kajko:8181' : '') + '/setup/applications/';
  }

  public list(): Observable<Application[]> {
    if (!this.applicationsCache$) {
      this.applicationsCache$ = this.http.get<{application}>(this.baseUrl, this.httpOptions).pipe(
        map(applications => applications.application),
        catchError(this.handleError<Plugin[]>('getApplications', [])),
        shareReplay()
      );
    }
    return this.applicationsCache$;
  }

  public read(id: string, config: any): Observable<Application> {
    const options = Object.assign({
      params: config
    }, this.httpOptions);

    return this.http.get<Application>(this.baseUrl + id, options);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }
}
