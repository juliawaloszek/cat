import {User} from './user';
import {Application} from './application';

export class Group {
  id = '';
  name = '';
  user: User[];
  applications: {
    application: Application[]
  };

  constructor() {
    {
      if (!this.user) {
        this.user = [];
      }

      if (!this.applications) {
        this.applications = {
          application: []
        };
      }
    }
  }
}
