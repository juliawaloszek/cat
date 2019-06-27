import { Restriction } from './restriction';
import { Functionality } from './functionality';

export class Application {
  application: object;
  id: string;
  guid: string;
  name: string;
  version: object;
  type: string;
  logo: string;
  restrictions: Array<Restriction>;
  functionalities: Array<Functionality>;
}
