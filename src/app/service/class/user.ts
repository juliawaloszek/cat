import {Group} from './group';

export class User {
  id: string;
  accountId: string;
  active: boolean;
  administrator = false;
  department: string;
  email: string;
  name: object;
  group: Array<Group>;
  history: object;
  lastLogon: object;
  password: object;
}
