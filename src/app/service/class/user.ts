import {Group} from './group';

export class User {
  id: string;
  accountId: string;
  active: boolean;
  lockedOut: boolean;
  administrator: boolean;
  name: object;
  department: string;
  email: string;
  groups: Array<Group>;
  expiresOn: Date;
  history: object;
  lastLogon: object;
  password: object;
}
