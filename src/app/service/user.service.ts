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
  private httpOptions = {
    withCredentials: true
  };
  private activeUserUrl = '';
  private url = '';

  private config = {
    groups: true,
    applications: true,
    functionalities: true,
    privileges: true
  };

  private usersCache$: Observable<User[]>;
  private activeUserCache$: Observable<User>;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.activeUserUrl = this.url = 'https://vm-kajko:8181';
    }

    this.activeUserUrl += '/setup/user/';
    this.url += '/setup/realms/iuip/users/';
  }

  get users(): Observable<User[]> {
    return this.http.get<{user}>(this.url, this.httpOptions).pipe(
      map(response => response.user
        .sort((userA, userB) => userB.name.full.toLowerCase() > userA.name.full.toLowerCase() ? -1 : 1)),
      catchError(this.handleError<User[]>('getUsers', [])),
      shareReplay()
    );
  }

  public active(): Observable<User> {
    if (!this.activeUserCache$) {
      this.activeUserCache$ = this.http.get<User>(this.activeUserUrl, this.httpOptions).pipe(
        tap(response => console.log(response)),
      ).pipe(
        shareReplay()
      );
    }
    return this.activeUserCache$;
  }

  public list(update?: boolean): Observable<User[]> {
    if (!this.usersCache$ || update) {
      this.usersCache$ = this.users;
    }
    return this.usersCache$;
  }

  public read(id: string, addConfig?: boolean): Observable<User> {
    const options = Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);

    return this.http.get<User>(this.url + id, options).pipe(
      map(user => Object.assign(user, {
        group: user.group || [],
        applications: (user.applications && user.applications.application) || {
          application: []
        }
      })),
      shareReplay()
    );
  }

  public create(user: User, addConfig?: boolean): Observable<any> {
    const options = Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);

    return this.http.post<User>(this.url, this.transform(user), options).pipe(
      tap(() => this.list(true)),
      catchError(error => {
        console.log('bład dodawania użytkownika', error);
        return of();
      }),
      shareReplay()
    );
  }

  public update(user: User, id: string, addConfig?: boolean): Observable<any> {
    const options = Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);

    return this.http.put<User>(this.url + id, this.transform(user), options).pipe(
      tap(() => this.list(true)),
      catchError(error => {
        console.log('bład edycji użytkownika', error);
        return of();
      }),
      shareReplay()
    );
  }

  public delete(id: string) {
    this.http.delete(this.url + id, this.httpOptions).pipe(
      tap(() => this.list(true)),
      catchError(error => {
        console.log('bład usuwania użytkownika', error);
        return of();
      })
    );
  }

  private transform(user) {
    return Object.assign(user, {
      group: user.group.map(group => ({id: group.id}))
      // applications: {
      //   application: user.applications.application.map(application => ({id: application.id}))
      // }
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }

}
