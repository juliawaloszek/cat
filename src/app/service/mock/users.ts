import { User } from '../model/user';

export const USERS: User[] = [{
  id: 'kalisz',
  accountId: '6ad11ea7-8395-4c91-a9dd-04cb8262706e',
  name: {
    full: 'Administrator'
  },
  active: true,
  administrator: true,
  department: '',
  email: 'rsokol@ispik.pl',
  group: [],
  history: {
    created: '1980-01-01T00:00:00+01:00',
    modified: '1980-01-01T00:00:00+01:00'
  },
  lastLogon: {
    successful: '2019-05-06T16:49:48+02:00',
    failed: '2019-05-06T15:49:48+02:00'
  },
  password: {
    expires: false,
    immutable: true,
    mustChange: false
  },
  applications: []
}, {
  id: 'kalisz2',
  accountId: '6ad11ea7-8395-4c91-a9dd-04cb8262706e',
  name: {
    full: 'Kalisz 2'
  },
  active: false,
  administrator: false,
  department: '',
  email: 'tgruszka@ispik.pl',
  group: [],
  history: {
    created: '1980-01-01T00:00:00+01:00',
    modified: '1980-01-01T00:00:00+01:00'
  },
  lastLogon: {
    successful: '2019-05-06T16:12:48+02:00',
    failed: '2019-04-06T12:49:48+02:00'
  },
  password: {
    expires: false,
    immutable: true,
    mustChange: false
  },
  applications: []
}];
