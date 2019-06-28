import {Group} from '../../../service/model/group';
import {SimpleColumn} from '../../../components/simple-table/model/simple-column';

export class GroupSource {
  private _data: Group[];
  private _checkColumn: boolean;
  private _columns: SimpleColumn[];

  constructor(data: Group[]) {
    this.data = data;
    this.checkColumn = true;
    this.columns = [{
      dataIndex: 'name',
      header: 'Nazwa',
      mapping: ''
    }];
  }

  get data(): Group[] {
    return this._data;
  }

  set data(value: Group[]) {
    this._data = value;
  }

  get checkColumn(): boolean {
    return this._checkColumn;
  }

  set checkColumn(value: boolean) {
    this._checkColumn = value;
  }

  get columns(): SimpleColumn[] {
    return this._columns;
  }

  set columns(value: SimpleColumn[]) {
    this._columns = value;
  }

}
