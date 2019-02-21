import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  logged = true;
  activeApp = 'dsafasd ddsffsd';

  constructor() { }

  ngOnInit() {
  }

  onLoggingButtonClick(): void {
    this.logged = !this.logged;
  }
}
