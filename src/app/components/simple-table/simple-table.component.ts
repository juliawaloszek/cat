import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {Group} from '../../service/model/group';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTableComponent implements OnInit, OnChanges {
  selection = new SelectionModel<any>(true, []);
  dataSource: MatTableDataSource<any>;

  @Input() list: any;
  @Input() nameLabel = false;
  @Output() selectionChanged = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const list: SimpleChange = changes.list;
    console.log(list, this.dataSource);
    // this.dataSource.data = list.currentValue;
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

}
