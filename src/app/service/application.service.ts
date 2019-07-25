import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Application } from './model/application';
import { BaseService } from './base.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService extends BaseService {
  private url = this.baseUrl + '/setup/applications/';
  protected listCache$: Observable<Application>;

  config = {
    functionalities: true,
    privileges: true,
    users: true,
    groups: true
  };

  constructor(http: HttpClient, dialog: MatDialog, snack: MatSnackBar) {
    super(http, dialog, snack);
  }

  get _list(): Observable<Application[]> {
    const options = Object.assign({
      params: {
        functionalities: true
      }
    }, this.httpOptions);

    return this.http.get<{application}>(this.url, options).pipe(
      map(response => this.sortBy(response.application, 'name')),
      catchError(err => this.handleError({
        message: 'Nie udało się pobrać listy aplikacji.',
        error: err,
        object: []
      })),
      shareReplay()
    );
  }

  public read(id: string, addConfig?: boolean): Observable<Application> {
    return this.http.get<Application>(this.url + id, this.getOptions(addConfig)).pipe(
      map(application => {
        if (application.functionalities && application.functionalities.functionality) {
          application.functionalities.functionality =
            this.sortBy(application.functionalities.functionality, 'name');

          if (application.functionalities.functionality.privileges) {
            application.functionalities.functionality.privileges =
              this.sortBy(application.functionalities.functionality.privileges.privilege, 'name');
          }
        }
        return application;
      }),
      catchError(err => this.handleError({
        message: 'Aplikacja o ID: ' + id + ' nie istnieje.',
        error: err,
        object: []
      })),
      shareReplay()
    );
  }

  public create(item, addConfig?: boolean): Observable<any> {
    console.error('Nieprawidłowa metoda dla tego typu obiektu');
    return of();
  }

  public update(application: Application, id: string, addConfig?: boolean): Observable<Application> {
    return this.http.put<Application>(this.url + id, application, this.getOptions(addConfig)).pipe(
      tap(() => this.openSnackBar({
        message: 'Aplikacja została zaktualizowana.'
      })),
      catchError(err => this.handleError({
        message: 'Nie udało się zapisać zmian.',
        error: err
      })),
      shareReplay()
    );
  }

  private transform(application: Application) {
    return {};
  }

}
