import {Component, Input, OnInit} from '@angular/core';
import {Plugin} from '../../service/model/plugin';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PluginService} from '../../service/plugin.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() type = 'administrative';
  @Input() plugins$: Observable<Plugin[]>;

  constructor(private pluginsService: PluginService,
              private router: Router) {}

  ngOnInit() {
    this.plugins$ = this.pluginsService.list();
  }

}
