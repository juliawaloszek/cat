import {User} from './user';
import {Application} from './application';

export class Group {
  id: string;
  name: string;
  user: Array<User>;
  applications: Array<Application>;

  constructor() {
    if (!this.user) {
      this.user = new Array<User>();
    }

    if (!this.applications) {
      this.applications = new Array<Application>();
    }
  }
}
