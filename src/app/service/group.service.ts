import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
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
  private groupsCache$: Observable<Group[]>;
  private baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = (isDevMode() ? 'https://vm-kajko:8181' : '') + '/setup/groups/';
  }

  public list(): Observable<Group[]> {
    if (!this.groupsCache$) {
      this.groupsCache$ = this.http.get<{group}>(this.baseUrl, this.httpOptions).pipe(
        map(response => response.group.sort((groupA, groupB) => groupB.name > groupA.name ? -1 : 1)),
        shareReplay()
      );
    }
    return this.groupsCache$;
  }

  public read(id: string, config: any): Observable<Group> {
    const options = Object.assign({
      params: config
    }, this.httpOptions);

    return this.http.get<Group>(this.baseUrl + id, options);
  }

  public create(group: Group): Observable<Group> {
    return this.http.post<Group>(this.baseUrl, group);
  }

  public update(group: Group): Observable<Group> {
    return this.http.put<Group>(this.baseUrl, group);
  }

  public delete(id: string) {
    this.http.delete(this.baseUrl + id).pipe(
      catchError(this.handleError<Group>())
    );
  }

  get groups(): Observable<Group[]> {
    if (!this.groupsCache$) {
      this.groupsCache$ = this.http.get<{group}>(this.baseUrl, this.httpOptions).pipe(
        map(response => response.group),
        shareReplay()
      );
    }
    return this.groupsCache$;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }

}
