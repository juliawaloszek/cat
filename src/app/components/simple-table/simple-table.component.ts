import {Component, Input, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit {
  @Input() list: any;
  @Input() nameLabel: string;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  constructor() { }

  ngOnInit() {
    if (this.list) {
      this.dataSource = new MatTableDataSource(this.list);
    }

    console.log(this.list);
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
}
