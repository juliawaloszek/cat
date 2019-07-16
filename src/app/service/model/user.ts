import {Password} from './password';
import {History} from './history';
import {Group} from './group';
import {LastLogon} from './lastlogon';
import {Application} from './application';

export class User {
  id = '';
  accountId = '';
  active = true;
  administrator = false;
  department = '';
  email = '';
  name = {
    full: ''
  };
  group: Group[];
  applications: {
    application: Application[]
  };
  history: History;
  lastLogon: LastLogon;
  password: Password;
  lockedOut?: boolean;

  constructor() {
    if (!this.password) {
      this.password = new Password();
    }

    if (this.group) {
      this.group = [];
    }
  }
}
