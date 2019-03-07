import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'CAT';
  logged = true;
  activeApp = '';

  onLoggingButtonClick(): void {
    this.logged = !this.logged;
  }
}
