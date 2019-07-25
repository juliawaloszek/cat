import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MessageComponent } from '../components/message/message.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected httpOptions;
  protected baseUrl;
  protected config;
  protected listCache$;
  protected _list;

  abstract read(id: string, addConfig?: boolean): Observable<any>;
  abstract create(item, addConfig?: boolean): Observable<any>;
  abstract update(item, id: string, addConfig?: boolean): Observable<any>;

  protected constructor(protected http: HttpClient,
                        protected dialog: MatDialog,
                        protected snack: MatSnackBar) {
    if (isDevMode()) {
      this.httpOptions = {
        withCredentials: true
      };
      this.baseUrl = 'https://vm-kajko:8181';
    }
  }

  public list(update?: boolean) {
    if (!this.listCache$ || update) {
      this.listCache$ = this._list;
    }

    return this.listCache$;
  }

  public save(item, addConfig?: boolean, id?: string) {
    return (id === 'new') ?
      this.create(item, true) :
      this.update(item, id, true);
  }

  public cancel(id: string) {
    return this.createDialog({
      message: 'Czy na pewno chcesz anulować wszystkie zmiany?',
      buttons: 'yes/no'
    }).afterClosed().pipe(
      map(response => {
        if (response === 'yes') {
          return this.read(id, true);
        }
      })
    );
  }

  protected createDialog(config: object) {
    return this.dialog.open(MessageComponent, {
      width: '350px',
      height: 'auto',
      data: config
    });
  }

  /**
   * @param config <ul>
   *     <li>message</li>
   *     <li>action</li>
   *     <li>duration</li>
   * </ul>
   */
  protected openSnackBar(config) {
    this.snack.open(config.message || 'Zapisano', config.action, {
      duration: config.duration || 5000,
      panelClass: config.action ? '' : 'center-content'
    });
  }

  protected sortBy(array, path?: string) {
    return array.sort((itemA, itemB) => {
      itemA = path ? this.resolve(itemA, path) || '' : itemA;
      itemB = path ? this.resolve(itemB, path) || '' : itemB;
      return itemB.toLowerCase() > itemA.toLowerCase() ? -1 : 1;
    });
  }

  protected fillEmptyValues(item, newItem) {
    return Object.assign(newItem, item);
  }

  /**
   * @param item - object
   * @param path - path for inside object mapping, each level separated with dot ('.')
   */
  protected resolve(item, path: string) {
    return path.split('.').reduce((previous, current) => {
      return previous ? previous[current] : null;
    }, item);
  }

  getOptions(addConfig) {
    return Object.assign({
      params: addConfig ? this.config : undefined
    }, this.httpOptions);
  }

  /**
   * @param config <ul>
   *     <li>operation</li>
   *     <li>message</li>
   *     <li>object</li>
   *     <li>error</li>
   * </ul>
   */
  protected handleError(config) {
    let message;
    let buttons;

    switch (config.error.status) {
      case 403: // dla niezalogowanego użytkownika
        // dowiedzieć się jak zatrzymać resztę wypływających żądań
        message = 'Brak uprawnień do danego żądania. Czy chcesz zalogować się na inne konto?';
        buttons = 'yes/no'
        break;
      case 409:
        message = config.subject + ' o takim ID już istnieje.'
        break;
      case 500:
        message = 'Wewnętrzny błąd serwera, proszę się skontaktować z administratorem.';
    }

    if (message || config.message) {
      this.createDialog({
        message: message || config.message,
        buttons
      });
    }

    console.log(config.error);
    return config.object ? of(config.object) : of();
  }

}
