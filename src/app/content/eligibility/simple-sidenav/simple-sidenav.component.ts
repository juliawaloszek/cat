import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-simple-sidenav',
  templateUrl: './simple-sidenav.component.html',
  styleUrls: ['./simple-sidenav.component.scss']
})
export class SimpleSidenavComponent implements OnInit {
  @Input() hideToolbarButtons = false;
  @Input() service;
  @Input() path: string;

  private item$: Observable<any>;
  private sidenavIsExpanded = true;
  private filterUsers = '';
  private params: any;
  private panel;
  private list;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
      this.updateList();
    });
  }

  updateList(config?) {
    this.service.list().subscribe(list => this.list = list);

    if (config.redirect) {
      this.router.navigate(['/eligibility/' + this.params.name
      + (config.id ? '/' + config.id : '')]);
    }
  }

  onSaveButtonClick() {
    // this.item$.subscribe(item => {
    //
    // })
    this.panel.save(this.params.id);
  }

  onCancelButtonClick(id: string) {
    this.service.cancel(id).subscribe(response => {
      if (response) {
        this.item$ = response;
      }
    });
  }

  onDeleteButtonClick() {
    this.service.delete(this.params.id).subscribe(response => {
      response.subscribe(() => this.updateList({
        redirect: true
      }));
    });
  }

  toggleSidenav() {

  }

  searchInObject(object, value, keys?: Array<'string'>): boolean {
    const me = this;

    return !!Object.keys(object).find(key => {
      if (Array.isArray(object[key]) || (keys && !keys.includes(object[key]))) {
        return false;
      } else {
        switch (typeof object[key]) {
          case 'object':
            return me.searchInObject(object[key], value);
          case 'boolean':
            return false;
          default:
            const keyValue = typeof object[key] === 'string' ?
              object[key].toLowerCase() :
              object[key].toString();

            return keyValue.indexOf(value) !== -1;
        }
      }
    });
  }

}
