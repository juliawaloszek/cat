import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Group } from './model/group';
import { BaseService } from './base.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService {
  private url = this.baseUrl + '/setup/groups/';

  config = {
    users: true,
    applications: true,
    functionalities: true,
    privileges: true
  };

  constructor(http: HttpClient, dialog: MatDialog, snack: MatSnackBar) {
    super(http, dialog, snack);
  }

  get _list(): Observable<Group[]> {
    return this.http.get<{group}>(this.url, this.httpOptions).pipe(
      map(response => this.sortBy(response.group, 'name')),
      catchError(err => this.handleError({
        message: 'Nie udało się pobrać listy grup.',
        error: err,
        object: []
      })),
      shareReplay()
    );
  }

  public read(id: string, addConfig?: boolean): Observable<Group> {
    return this.http.get<Group>(this.url + id, this.getOptions(addConfig)).pipe(
      map(group => Object.assign(this.fillEmptyValues(group, new Group()), {
        applications: {
          application: group.applications.application || []
        },
        user: (group.user && group.user.length > 0) ? group.user : []
      })),
      catchError(err => {
        if (err.status === 404 && id === 'new') {
          return of(new Group());
        }

        return this.handleError({
          message: 'Grupa o ID: ' + id + ' nie istnieje.',
          error: err
        });
      }),
      shareReplay()
    );
  }

  public create(group: Group, addConfig?: boolean): Observable<any> {
    return this.http.post<Group>(this.url, this.transform(group), this.getOptions(addConfig)).pipe(
      tap(() => this.openSnackBar({
        message: 'Grupa została utworzona'
      })),
      catchError(err => this.handleError({
        message: 'Nie udało się zapisać grupy.',
        subject: 'Grupa',
        error: err
      })),
      shareReplay()
    );
  }

  public update(group: Group, id: string, addConfig?: boolean): Observable<any> {
    return this.http.put<Group>(this.url + id, group, this.getOptions(addConfig)).pipe(
      tap(() => this.openSnackBar({
        message: 'Grupa została zaktualizowana'
      })),
      catchError(err => this.handleError({
        message: 'Nie udało się zapisać zmian.',
        subject: 'Grupa',
        error: err
      })),
      shareReplay()
    );
  }

  public delete(id: string): Observable<any> {
    return this.createDialog({
      message: 'Czy na pewno chcesz usunąć grupę o ID: ' + id + '?',
      buttons: 'yes/no'
    }).afterClosed().pipe(
      map(response => {
        if (response === 'yes') {
          return this.http.delete<any>(this.url + id, this.httpOptions).pipe(
            tap(() => this.openSnackBar({
              message: 'Grupa została usunięta'
            })),
            catchError(err => this.handleError({
              message: 'Nie udało się usunąć grupy o ID: ' + id + '.',
              error: err
            }))
          );
        }
        return;
      }));
  }

  private transform(group: Group) {
    return Object.assign({
      user: group.user.map(user => ({id: user.id})),
      applications: group.applications.application.length > 0 ? {
        application: group.applications.application.map(application => ({id: application.id}))
      } : undefined
    }, group);
  }

}
