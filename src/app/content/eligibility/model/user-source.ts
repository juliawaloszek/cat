import {User} from '../../../service/model/user';
import {SimpleColumn} from '../../../components/simple-table/model/simple-column';

export class UserSource {
  private _data: User[];
  private _checkColumn: boolean;
  private _columns: SimpleColumn[];

  constructor(data: User[]) {
    this._data = data;
    this._checkColumn = true;
    this._columns = [{
      dataIndex: 'name',
      header: 'Imię i Nazwisko',
      mapping: 'full'
    }, {
      dataIndex: 'department',
      header: 'Wydział',
      mapping: ''
    }];
  }

  get data(): User[] {
    return this._data;
  }

  set data(value: User[]) {
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
