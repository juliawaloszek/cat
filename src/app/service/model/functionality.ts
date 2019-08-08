import { Privilege } from './privilege';

export class Privileges {
  privilege: Privilege[];

  constructor() {
    {
      if (!this.privilege) {
        this.privilege = [];
      }
    }
  }
}

export class Functionality {
  id: string;
  name: string;
  privileges: {
    privilege: Privilege[]
  };

  constructor() {
    {
      if (!this.privileges) {
        this.privileges = new Privileges();
      }
    }
  }
}
