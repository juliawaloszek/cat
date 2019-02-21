import { Component, OnInit } from '@angular/core';
import { APPS } from './appslist';
import {App} from './app';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})
export class AppmenuComponent implements OnInit {
  selectedTile = null;
  apps = APPS;

  constructor() { }

  ngOnInit() {
  }

  onTileClick( appItem: App ): void {
    this.selectedTile = appItem;
  }

}
