import { Component, OnInit } from '@angular/core';
import { Plugin } from '../../service/model/plugin';
import { ActivatedRoute } from '@angular/router';
import {PluginService} from '../../service/plugin.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {
  plugins$: Observable<Plugin[]>;
  activePlugin$: Observable<Plugin>;

  constructor(private pluginsService: PluginService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.plugins$ = this.pluginsService.list();
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.activePlugin$ = this.pluginsService.read(params.id);
      }
    });
  }

}
