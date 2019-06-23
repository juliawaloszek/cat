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

  @Input() list: any;
  @Input() nameLabel = false;
  @Output() selectionChanged = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<any>(this.list);
    }
    const list: SimpleChange = changes.list;

    // if (list.isFirstChange()) {
    //   this.dataSource = new MatTableDataSource<any>(this.list);
    // } else {
    //   this.dataSource = new MatTableDataSource<any>(list.currentValue);
    // }
    this.dataSource.data = list.currentValue;
    console.log(this.dataSource);
    // console.log(list.currentValue);
    // console.log(this.table);

    this.dataSource.connect();
    // this.dataSource._pageData(list.currentValue);

    // console.log(this.dataSource.data);
    // this.refreshTable(list.currentValue);
  }

  ngOnInit() {
    if (this.list) {
      this.dataSource = new MatTableDataSource(this.list);
    }
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
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
