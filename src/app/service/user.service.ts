import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from './model/user';
import { BaseService } from './base.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private activeUserCache$: Observable<User>;
  private activeUserUrl: string;
  private departmentsUrl: string;
  private url: string;

  config = {
    groups: true,
    applications: true,
    functionalities: true,
    privileges: true
  };

  constructor(http: HttpClient, dialog: MatDialog, snack: MatSnackBar) {
    super(http, dialog, snack);

    this.activeUserUrl = this.baseUrl + '/setup/user/';
    this.departmentsUrl = this.baseUrl + '/setup/realms/iuip/departments';
    this.url = this.baseUrl + '/setup/realms/iuip/users/';
  }

  get _list(): Observable<User[]> {
    return this.http.get<{user}>(this.url, this.httpOptions).pipe(
      map(response => this.sortBy(response.user, 'name.full')),
      catchError(err => this.handleError({
        message: 'Nie udało się pobrać listy użytkowników.',
        error: err,
        object: []
      })),
      shareReplay()
    );
  }

  public active(): Observable<User> {
    if (!this.activeUserCache$) {
      this.activeUserCache$ = this.http.get<User>(this.activeUserUrl, this.httpOptions).pipe(
        tap(response => console.log(response)),
        catchError(err => this.handleError({
          message: 'Nie udało się pobrać aktywnego użytkownika.',
          error: err
        })),
        shareReplay()
      );
    }
    return this.activeUserCache$;
  }

  public read(id: string, addConfig?: boolean): Observable<User> {
    return this.http.get<User>(this.url + id, this.getOptions(addConfig)).pipe(
      map(user => Object.assign(this.fillEmptyValues(user, new User()), {
        applications: {
          application: user.applications.application || []
        },
        group: user.group.length > 0 ? user.group : []
      })),
      catchError(err => {
        if (err.status === 404 && id === 'new') {
          return of(new User());
        }

        return this.handleError({
          message: 'Użytkownik o ID: ' + id + ' nie istnieje.',
          error: err
        });
      }),
      shareReplay()
    );
  }

  public departments(): Observable<string[]> {
    return this.http.get<{department}>(this.departmentsUrl, this.httpOptions).pipe(
      map(response => this.sortBy(response.department)),
      catchError(err => this.handleError({
        message: 'Nie udało się pobranić słownika wydziałów.',
        error: err
      }))
    );
  }

  public create(user: User, addConfig?: boolean): Observable<any> {
    return this.http.post<User>(this.url, this.transform(user), this.getOptions(addConfig)).pipe(
      tap(() => this.openSnackBar({
        message: 'Utworzono nowego użytkownika'
      })),
      catchError(err => this.handleError({
        message: 'Nie udało się zapisać użytkownika.',
        subject: 'Użytkownik',
        error: err
      })),
      shareReplay()
    );
  }

  public update(user: User, id: string, addConfig?: boolean) {
    return this.http.put<User>(this.url + id, this.transform(user), this.getOptions(addConfig)).pipe(
      tap(() => this.openSnackBar({
        message: 'Zaktualizowano użytkownika'
      })),
      catchError(err => this.handleError({
        message: 'Nie udało się zapisać zmian.',
        subject: 'Użytkownik',
        error: err
      })),
      shareReplay()
    );
  }

  public delete(id: string): Observable<any> {
    return this.createDialog({
      message: 'Czy na pewno chcesz usunąć konto użytkownika: ' + id + '?',
      buttons: 'yes/no'
    }).afterClosed().pipe(
      map(response => {
        if (response === 'yes') {
          return this.http.delete<any>(this.url + id, this.httpOptions).pipe(
            tap(() => this.openSnackBar({
              message: 'Usunięto użytkownika'
            })),
            catchError(err => {
              const message = (err.status === 400) ?
                'Nie można usunąć swojego konta użytkownika.' :
                'Nie udało się usunąć użytkownika o ID: ' + id + '.';

              return this.handleError({
                message,
                error: err
              });
            })
          );
        }
        return;
      }));
  }

  private transform(user) {
    return Object.assign(user, {
      group: user.group.map(group => ({id: group.id}))
      // applications: {
      //   application: user.applications.application.map(application => ({id: application.id}))
      // }
    });
  }

}
