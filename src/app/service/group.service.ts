import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, publish, shareReplay, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { isDevMode } from '@angular/core';

import { Group } from './model/group';
import {delayResponse} from 'angular-in-memory-web-api/delay-response';
import {transformAll} from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private httpOptions = {
    withCredentials: true // necessary for dev version
  };

  private groupsCache$: Observable<Group[]>;
  private baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = (isDevMode() ? 'https://vm-kajko:8181' : '') + '/setup/groups/';

  }

  // get groups(): Observable<Group[]> {
  //   return this.http.get<{group}>(this.baseUrl, this.httpOptions).pipe(
  //     map(response => response.group.sort((groupA, groupB) => groupB.name > groupA.name ? -1 : 1)),
  //     shareReplay()
  //   );
  // }

  public list(): Observable<Group[]> {
    // if (!this.groupsCache$) {
    //   this.groupsCache$ = this.groups;
    // }
    return this.groups;
  }

  public read(id: string, config: {applications, users}): Observable<Group> {
    const options = Object.assign({
      params: config
    }, this.httpOptions);

    return this.http.get<Group>(this.baseUrl + id, options).pipe(
      shareReplay()
    );
  }

  public create(group: Group): Observable<any> {
    if (!group.user) {
      delete group.user;
    }
    if (!group.applications.application) {
      delete group.applications;
    }
    return this.http.post<Group>(this.baseUrl, group, this.httpOptions).pipe(
      tap(newGroup => this.updateList(newGroup)),
      catchError(error => {
        console.log('bład dodawania użytkownika', error);
        return of();
      }),
      shareReplay()
    );
  }

  public update(group: Group, id: string): Observable<any> {
    return this.http.put<Group>(this.baseUrl + id, group, this.httpOptions).pipe(
      tap((renewedGroup) => this.updateList(renewedGroup, id)),
      catchError(error => {
        console.log('bład edycji grupy', error);
        return of();
      }),
      shareReplay()
    );
  }

  public delete(id: string) {
    this.http.delete(this.baseUrl + id).pipe(
      catchError(this.handleError<Group>()),
      shareReplay()
    );
  }

  get groups(): Observable<Group[]> {
    return this.http.get<{group}>(this.baseUrl, this.httpOptions).pipe(
      map(response => response.group.sort((groupA, groupB) => groupB.name > groupA.name ? -1 : 1)),
      shareReplay(1)
    );
  }

  private updateList(renewedGroup, id?) {
    this.list().pipe(
      tap(list => {
        if (id) {
          list.forEach(group => {
            if (group.id === id) {
              group = renewedGroup;
              return false;
            }
          });
        } else {
          list.push(renewedGroup);
        }

        list.sort((groupA, groupB) => groupB.name > groupA.name ? -1 : 1);
      }),
      publish()
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }

}
