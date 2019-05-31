import { Component, OnInit } from '@angular/core';
import { Plugin } from '../../service/model/plugin';
import { ActivatedRoute } from '@angular/router';
import {PluginService} from '../../service/plugin.service';
import {find, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-configurators-list',
  templateUrl: './configurators-list.component.html',
  styleUrls: ['./configurators-list.component.scss']
})

export class ConfiguratorsListComponent implements OnInit {
  plugins$: Observable<Plugin[]>;
  activePlugin$: Observable<Plugin>;

  constructor(private pluginsService: PluginService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.plugins$ = this.pluginsService.list();
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.getApplication(params.id);
      }
    });
  }

  getApplication(id: string): void {
    // const id = this.route.snapshot.paramMap.get('id');
    this.activePlugin$ = this.pluginsService.read(id).pipe(
      tap(plugin => console.log(plugin))
    );
  }
}
