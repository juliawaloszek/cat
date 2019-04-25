import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from './class/user';
import { Application } from './class/application';

@Injectable({
  providedIn: 'root'
})

export class ActiveUserService {
  private httpOptions = {
    withCredentials: true // necessary for dev version
  };
  private userCache$: Observable<User>;
  private url = 'http://vm-kajko/setup/user';

  constructor(private http: HttpClient) { }

  get user(): Observable<User> {
    if (!this.userCache$) {
      this.userCache$ = this.userRequest().pipe(
        shareReplay()
      );
    }
    return this.userCache$;
  }

  private userRequest(): Observable<User> {
    return this.http.get<User>(this.url, this.httpOptions).pipe(
      tap(response => console.log(response)),
      // catchError(this.handleError<User>('getApplications', ''))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }

}
