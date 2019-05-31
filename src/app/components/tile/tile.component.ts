import {Component, Input, isDevMode, OnInit} from '@angular/core';
import {Plugin} from '../../service/model/plugin';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() plugin: Plugin;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.plugin.url) {
      if (isDevMode()) {
        window.open('http://' + window.location.hostname + '/' + this.plugin.url);
      } else {
        window.open(this.plugin.url);
      }
    }
  }

}
