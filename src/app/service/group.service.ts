import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

import { Group} from './class/group';

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
    this.baseUrl = (isDevMode() ? 'https://vm-kajko:8181' : '') + '/setup/groups';
  }

  get groups(): Observable<Group[]> {
    if (!this.groupsCache$) {
      this.groupsCache$ = this.http.get<Group>(this.baseUrl, this.httpOptions).pipe(
        map(response => response = response.group)
      );
    }
    return this.groupsCache$;
  }
}
