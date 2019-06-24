import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class SimpleTableComponent implements OnInit,  OnChanges {
  selection = new SelectionModel<any>(true, []);
  dataSource: MatTableDataSource<any>;
  keys: Array<string> = [];

  @Input() config: {
    data: any[],
    checkColumn: boolean,
    columns: Array<{
      dataIndex: string,
      header: string,
      mapping: string
    }>
  };
  @Output() selectionChanged = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<any>(this.config.data);
    }
    const list: SimpleChange = changes.config;
    this.dataSource.data = list.currentValue.data;
    // console.log(this.dataSource);

    this.dataSource.connect();
  }

  ngOnInit() {
    const self = this;
    self.getDataSource();

    if (self.config.checkColumn) {
      self.keys.push('select');
    }

    this.config.columns.forEach(column => {
      self.keys.push(column.dataIndex);
    });
  }

  getDataSource() {
    if (!this.dataSource) {
      this.dataSource =  new MatTableDataSource(this.config.data);
    }
    return this.dataSource;
  }

  isAllSelected() {
    return this.selection.selected.length === this.getDataSource().data.length;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return (this.isAllSelected() ? 'select' : 'deselect') + 'all';
    }
    return (this.selection.isSelected(row) ? 'deselect' : 'select') + 'row' + row.position + 1;
  }

  onSelectionChanged($event, row) {
    if ($event) {
      this.selection.toggle(row);
    }
    this.selectionChanged.emit(this.selection.selected);
  }

  refreshTable(data) {
    console.log(this.dataSource);
    this.dataSource.connect().next(data);
    this.dataSource._updateChangeSubscription();
    // this.paginator._changePageSize(this.paginator.pageSize);
  }

}
