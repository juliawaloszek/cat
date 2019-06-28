import {Application} from '../../../service/model/application';

export class AppSource {
  private _data: Application[];
  private _checkColumn: boolean;
  private _columns: any[];

  constructor(data: Application[]) {
    this._data = data;
    this._checkColumn = true;
    this._columns = [{
      dataIndex: 'name',
      header: 'Nazwa'
    }];
  }

  get data(): Application[] {
    return this._data;
  }

  set data(value: Application[]) {
    this._data = value;
  }

  get checkColumn(): boolean {
    return this._checkColumn;
  }

  set checkColumn(value: boolean) {
    this._checkColumn = value;
  }

  get columns(): any[] {
    return this._columns;
  }

  set columns(value: any[]) {
    this._columns = value;
  }

}
