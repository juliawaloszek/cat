import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Plugin} from '../../service/model/plugin';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PluginService} from '../../service/plugin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output() afterClickAction = new EventEmitter<any>();
  @Input() type = 'administrative';
  @Input() plugins$: Observable<Plugin[]>;

  constructor(private pluginsService: PluginService,
              private router: Router) {}

  ngOnInit() {
    this.plugins$ = this.pluginsService.list();
  }

}
