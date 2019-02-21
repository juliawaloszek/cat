import { Injectable } from '@angular/core';
import { LIST } from './content/sidenav/applist';
import { ListItem } from './content/sidenav/listitem';
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
