import * as url from 'url';

export class Plugin {
  id: string;
  name: string;
  url: url;
  logo: string;
  properties: object;
  description: string;
  type: string;
}
