import {Password} from './password';
import {History} from './history';
import {Group} from './group';
import {LastLogon} from './lastlogon';

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
  group: Array<Group>;
  history: History;
  lastLogon: LastLogon;
  password: Password;

  constructor() {
    if (!this.password) {
      this.password = new Password();
    }

    if (this.group) {
      this.group = new Array<Group>();
    }
  }
}
