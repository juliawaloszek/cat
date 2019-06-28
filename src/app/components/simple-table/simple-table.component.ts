import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { SimpleDataSource } from './simple-data-source';
import { fromEvent } from 'rxjs';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})

export class SimpleTableComponent implements OnInit {
  @Output() selectionChanged = new EventEmitter<any>();

  dataSource: SimpleDataSource | null;
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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

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
      this.dataSource = new SimpleDataSource(this.config.data, this.sort);
    }
    return this.dataSource;
  }

  public loadData() {
    this.getDataSource();

    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  public removeSelection() {
    this.getDataSource().removeData(this.selection.selected);
    this.selection.clear();
  }

  isAllSelected() {
    return this.selection.selected.length === this.getDataSource().filteredData.length;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));

    this.selectionChanged.emit(this.selection.selected);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return (this.isAllSelected() ? 'select' : 'deselect') + 'all';
    }
    return (this.selection.isSelected(row) ? 'deselect' : 'select') + 'row' + row.position + 1;
  }

  // z jakiegoś powodu to się wywołuje czasem z opóźnieniem
  onSelectionChanged($event, row) {
    if ($event) {
      this.selection.toggle(row);
    }
    this.selectionChanged.emit(this.selection.selected);
  }

}
