import {Component, Input, OnInit} from '@angular/core';
import { Application } from '../../service/model/application';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() application: Application;

  constructor() { }

  ngOnInit() {
    console.log(this.application);
  }

}
