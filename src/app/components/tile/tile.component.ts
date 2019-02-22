import {Component, Input, OnInit} from '@angular/core';
import { Application } from '../../service/class/application';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() application: Application;

  constructor() { }

  ngOnInit() {
  }

}
