import {Password} from './password';
import {History} from './history';
import {Group} from './group';
import {LastLogon} from './lastlogon';
import {Application} from './application';

export class Name {
  full ? = '';
  firstName ? = '';
  lastName ? = '';

  constructor() {
    {
      if (!this.full && (this.firstName || this.lastName)) {
        this.full = this.firstName + ' ' + this.lastName;
      }
    }
  }
}

export class Applications {
  application?: Application[] = [];
}

export class User {
  id = '';
  accountId = '';
  active = true;
  administrator = false;
  department = '';
  email = '';
  name: Name = new Name();
  group: Group[] = [];
  applications?: Applications;
  history: History;
  lastLogon: LastLogon;
  password: Password = new Password();
  lockedOut ? = false;

  constructor() {
    {
      if (!this.password) {
        this.password = new Password();
      }

      if (!this.name) {
        this.name = new Name();
      }

      if (!this.group) {
        this.group = [];
      }

      if (!this.applications) {
        this.applications = new Applications();
      }
    }
  }
}
