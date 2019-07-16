import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private httpOptions;
  private baseUrl;
  private scheme;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.httpOptions = {
        withCredentials: true
      };
      this.baseUrl = 'https://vm-kajko:8181';
    }
  }

  public list(): Observable<any[]> {
    return of([]);
  }

  private updateList(item, id?, operation?: string) {
    this.list().pipe(
      tap(list => {
        if (operation === 'delete') {
          list.filter(listItem => listItem.id !== id);
        } else {
          if (id) {
            list.map(listItem => (listItem.id === id) ? item : listItem);
          } else {
            list.push(item);
          }
        }
        list.sort(this.sort);
      })
    );
  }

  private handleError(operation, message, error?) {
    console.error(operation, message);
    console.error(error);

    return of();
  }

  private sort(itemA, itemB) {
    return itemB.name > itemA.name ? -1 : 1;
  }

  // private transform(item) {
  //   return Object.assign(());
  // }
}
