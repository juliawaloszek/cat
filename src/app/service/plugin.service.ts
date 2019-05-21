import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Plugin} from './model/plugin';
import {catchError, map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  private httpOptions = {
    withCredentials: true // necessary for dev version
  };
  private baseUrl;
  private plugins$: Observable<Plugin[]>;

  constructor(private http: HttpClient) {
    this.baseUrl = (isDevMode() ? 'https://vm-kajko:8181' : '') + '/setup/plugins/';
  }

  public list(): Observable<Plugin[]> {
    if (!this.plugins$) {
      this.plugins$ = this.http.get<Plugin[]>(this.baseUrl, this.httpOptions).pipe(
        map(plugins => plugins.plugin),
        catchError(this.handleError<Plugin[]>('getApplications', []))
      ).pipe(
        shareReplay()
      );
    }
    return this.plugins$;
  }

  public read(id: string): Observable<Plugin> {
    return this.list().pipe(
      map(plugins => plugins.find(plugin => plugin.id === id))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }
}
