import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import { catchError, map, publish, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

import { Group } from './model/group';
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private httpOptions = {
    withCredentials: true // necessary for dev version
  };
  private baseUrl;

  private config = {
    users: true,
    applications: true,
    functionalities: true,
    privileges: true
  };

  private groupsCache$: Observable<Group[]>;

  constructor(private http: HttpClient) {
    this.baseUrl = (isDevMode() ? 'https://vm-kajko:8181' : '') + '/setup/groups/';
  }

  get groups(): Observable<Group[]> {
    return this.http.get<{group}>(this.baseUrl, this.httpOptions).pipe(
      map(response => response.group
        .sort((groupA, groupB) => groupB.name.toLowerCase() > groupA.name.toLowerCase() ? -1 : 1)),
      shareReplay()
    );
  }

  public list(update?: boolean): Observable<Group[]> {
    if (!this.groupsCache$ || update) {
      this.groupsCache$ = this.groups;
    }
    return this.groupsCache$;
  }

  public read(id: string, addConfig?: boolean): Observable<Group> {
    const options = Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);

    return this.http.get<Group>(this.baseUrl + id, options).pipe(
      map(group => Object.assign(group, {
        user: group.user || [],
        applications: (group.applications && group.applications.application) ? group.applications : {
          application: []
        }
      })),
      shareReplay()
    );
  }

  public create(group: Group, addConfig?: boolean): Observable<any> {
    const options = Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);

    return this.http.post<Group>(this.baseUrl, this.transform(group), options).pipe(
      tap(() => this.list(true)),
      catchError(error => {
        console.log('bład dodawania użytkownika', error);
        return of();
      }),
      shareReplay()
    );
  }

  public update(group: Group, id: string, addConfig?: boolean): Observable<any> {
    const options = Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);

    return this.http.put<Group>(this.baseUrl + id, group, options).pipe(
      tap(() => this.list(true)),
      catchError(error => {
        console.log('bład edycji grupy', error);
        return of();
      }),
      shareReplay()
    );
  }

  public delete(id: string) {
    this.http.delete(this.baseUrl + id).pipe(
      tap(() => this.list(true)),
      catchError(error => {
        console.log('bład usuwania grupy', error);
        return of();
      })
    );
  }

  private transform(group) {
    return Object.assign(group, {
      user: group.user.map(user => ({id: user.id}))
      // applications: {
      //   application: group.applications.application.map(application => ({id: application.id}))
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
