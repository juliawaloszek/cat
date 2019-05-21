import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private httpOptions = {};
  private activeUserUrl = '';
  private url = '';

  private usersCache$: Observable<User[]>;
  private activeUserCache$: Observable<User>;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.httpOptions = {
        withCredentials: true // necessary for dev version
      }; // dalej może być przydatna funkcja Object.assign
      this.activeUserUrl = this.url = 'https://vm-kajko:8181';
    }

    this.activeUserUrl += '/setup/user/';
    this.url += '/setup/realms/iuip/users/';
  }

  public active(): Observable<User> {
    if (!this.activeUserCache$) {
      this.activeUserCache$ = this.http.get<User>(this.activeUserUrl, this.httpOptions).pipe(
        tap(response => console.log(response)),
        // catchError(this.handleError<User>('getApplications', ''))
      ).pipe(
        shareReplay()
      );
    }
    return this.activeUserCache$;
  }

  public list(): Observable<User[]> {
    if (!this.usersCache$) {
      this.usersCache$ = this.http.get<User[]>(this.url, this.httpOptions).pipe(
        map(users => users.user),
        catchError(this.handleError<User[]>('getUsers', [])),
        shareReplay()
      );
    }
    return this.usersCache$;
  }

  public read(id: string): Observable<User> {
    return this.http.get<User>(this.url + id, this.httpOptions);
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.url + user.id, user);
  }

  public delete(id: string) {
    this.http.delete(this.url + id).pipe(
      catchError(this.handleError<User>())
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }

}
