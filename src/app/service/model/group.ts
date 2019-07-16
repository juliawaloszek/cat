import {User} from './user';
import {Application} from './application';

export class Group {
  id: string;
  name: string;
  user: User[] = [];
  applications: {
    application: Application[]
  };

  constructor() {
    if (!this.user) {
      this.user = new Array<User>();
    }

    if (!this.applications) {
      this.applications = {
        application: new Array<Application>()
      };
    }
  }
}
