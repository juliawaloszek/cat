import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {SimpleDataSource} from './simple-data-source';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class SimpleTableComponent implements OnInit,  OnChanges {
  @Output() dataSource: SimpleDataSource | null;
  @Output() selectionChanged = new EventEmitter<any>();

  selection = new SelectionModel<any>(true, []);
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

  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    // const list: SimpleChange = changes.config;
    // this.dataSource.data = list.currentValue.data;
    console.log(this.getDataSource());
    //
    // this.dataSource.connect();
  }

  ngOnInit() {
    const me = this;
    me.loadData();

    if (me.config.checkColumn) {
      me.keys.push('select');
    }

    this.config.columns.forEach(column => {
      me.keys.push(column.dataIndex);
    });
  }

  getDataSource() {
    if (!this.dataSource) {
      this.dataSource = new SimpleDataSource(this.config.data, this.paginator);
    }
    return this.dataSource;
  }

  public loadData() {
    this.getDataSource();

    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  isAllSelected() {
    return this.selection.selected.length === this.getDataSource().filteredData.length;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
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
    // console.log(this.dataSource);
    // this.dataSource.connect().next(data);
    // this.dataSource._updateChangeSubscription();
    // this.paginator._changePageSize(this.paginator.pageSize);
  }

}
