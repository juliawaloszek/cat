import * as url from 'url';
import { Restriction } from './restriction';
import { Functionality } from './functionality';

export class Application {
  id: string;
  guid: string;
  name: string;
  version: object;
  url: url;
  type: string;
  logo: string;
  restrictions: Array<Restriction>;
  functionalities: Array<Functionality>;
  plugin: any;
}
