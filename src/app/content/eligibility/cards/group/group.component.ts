import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GroupSource } from '../../model/group-source';
import { Group } from '../../../../service/model/group';
import { GroupService } from '../../../../service/group.service';
import { InterpolateDialogComponent } from '../../interpolate-dialog/interpolate-dialog.component';
import { MatDialog } from '@angular/material';
import { SimpleTableComponent } from '../../../../components/simple-table/simple-table.component';

@Component({
  selector: 'app-group-card',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @ViewChild('table') groupTable: SimpleTableComponent;
  @Input() groups: Group[];
  private groupSource: GroupSource;

  constructor(private groupService: GroupService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.groupSource = new GroupSource(this.groups || []);
  }

  onAddGroupButton() {
    this.groupService.list().subscribe(
      groups => {
        groups = groups.filter(group => !this.groups.some(lGroup => group.id === lGroup.id));

        const dialogRef = this.createDialog({
          list: Object.assign(this.groupSource, {
            data: groups
          }),
          dialogTitle: 'Dodaj grupy'
        }, '500px');

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            result.forEach(group => {
              this.groups.push(group);
            });

            this.groupTable.getDataSource().loadData(this.groups);
          }
        });
      }
    );
  }

  onRemoveGroupButton() {
    this.groupTable.removeSelection();
  }

  createDialog(data: object, width: string = '350px') {
    return this.dialog.open(InterpolateDialogComponent, {
      width, height: '50%', data
    });
  }

}
