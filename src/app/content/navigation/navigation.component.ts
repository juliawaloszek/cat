import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  logged = true;
  activeApp = 'dsafasd ddsffsd';

  constructor() { }

  ngOnInit() {
  }

  onLoggingButtonClick(): void {
    this.logged = !this.logged;
  }

}
