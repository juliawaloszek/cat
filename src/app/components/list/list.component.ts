import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../service/class/application';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() applications: Application[];

  constructor() { }

  ngOnInit() {
  }

}
