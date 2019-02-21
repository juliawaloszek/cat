import { Component, OnInit } from '@angular/core';
import { ListItem } from './listitem';
import { ApplicationlistService } from '../applicationlist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  list = null;
  selectedItem = null;
  safeUrl: SafeResourceUrl;

  constructor(private listService: ApplicationlistService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getList();
  }

  onSelect( listItem: ListItem ): void {

    if (listItem.url) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(listItem.url);
      // listItem.url = this.safeUrl;
      // console.log(this.safeUrl);
    }

    this.selectedItem = listItem;
  }

  getList(): void {
    this.listService.getList()
      .subscribe(list => this.list = list);
  }

}
