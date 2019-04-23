import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { APPS } from './mock/applications';
import { Application } from './class/application';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApplicationsService {

  constructor(
    private http: HttpClient
  ) { }
  private active = null;
  private baseUrl = 'https://vm-kajko:8181/setup/plugins';

  private static log(message: string) {
    console.log(message);
  }

  public getApplications(type: string): Observable<Application[]> {
    // if (type !== '') {
    //   return of(APPS.filter(application => application.type === type));
    // } else {
    //   return of(APPS);
    // }
    return this.http.get<Application[]>(this.baseUrl).pipe(
      tap(_ => ApplicationsService.log('fetched apps')),
      catchError(this.handleError<Application[]>('getApplications', []))
    );
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      // ApplicationsService.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }
}
