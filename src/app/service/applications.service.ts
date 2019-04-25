import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Application } from './class/application';

@Injectable({
  providedIn: 'root'
})

export class ApplicationsService {
  private httpOptions = {
    withCredentials: true // necessary for dev version
  };
  private pluginsCache$: Observable<Application[]>;
  private baseUrl = 'http://vm-kajko/setup';

  constructor(private http: HttpClient) { }

  get plugins(): Observable<Application[]> {
    if (!this.pluginsCache$) {
      this.pluginsCache$ = this.getApplications('/plugins').pipe(
        shareReplay()
      );
    }
    return this.pluginsCache$;
  }

  private getApplications(type): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl + type, this.httpOptions).pipe(
      map(response => response = response.plugin),
      tap(response => console.log(response)),
      catchError(this.handleError<Application[]>('getApplications', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }
}
