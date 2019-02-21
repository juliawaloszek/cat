import { Injectable } from '@angular/core';
import { LIST } from './sidenav/applist';
import { ListItem } from './sidenav/listitem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApplicationlistService {

  constructor() { }

  getList(): Observable<ListItem[]> {
    return of(LIST);
  }
}
