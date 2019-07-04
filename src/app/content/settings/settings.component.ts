import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/service/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor( private userService: UserService ) { }
  // activeUser$: Observable<User>;
  user: User;

  /////////////////////////////////////

  visible = true;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  message = 'Hola Mundo!';

  ngOnInit() {
    this.userService.active()
    .subscribe(user => {
      console.log(user); // Example
      this.user = user;
    }, err => {
      throw err;
    });
  }





  /////////////////////////////////////
  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }

}
