import { Application } from '../class/application';

export const APPS: Application[] = [{
  id: 'gpt-conf',
  guid: '',
  name: 'Konfigurator GPT',
  version: {},
  url: 'https://vm-kajko:8181/app-gpt-configurator/modules/portal/index.xhtml',
  logo: '~src/assets/img/logo_gpt.png',
  type: 'configuration',
  restrictions: [],
  functionalities: []
}, {
  id: 'gpt-app',
  guid: '',
  name: 'GPT',
  version: {},
  url: 'https://vm-kajko:8181/gpt4-dev',
  logo: '~src/assets/img/logo_gpt.png',
  type: 'application',
  restrictions: [],
  functionalities: []
}, {
  id: 'lelum-polelum',
  guid: '',
  name: 'Lelum Polelum',
  version: {},
  url: '',
  logo: '~src/assets/img/logo_gpt.png',
  type: 'configuration',
  restrictions: [{
    id: 'gpt-tool-appliform',
    name: 'Narzędzie składania wniosków',
    valueType: 'boolean',
    values: ['true', 'false']
  }],
  functionalities: [{
    id: 'print',
    name: 'Drukowanie mapy',
    privileges: [{
      id: 'print-res',
      name: 'Maksymalna rozdzielczość wydruku',
      type: 'integer',
      values: [{
        value: 300,
        description: 'Rozdzielczość 300 dpi'
      }],
      value: '300'
    }]
  }, {
    id: 'nana',
    name: 'Nuna Nanu',
    privileges: []
  }]
}, {
  id: 'gpt-conf',
  guid: '',
  name: 'Konfigurator GPT',
  version: {},
  url: '',
  logo: '~src/assets/img/cat1.gif',
  type: 'application',
  restrictions: [],
  functionalities: []
}, {
  id: 'dfasfasdfsd',
  guid: '',
  name: 'Konfigurator GPT',
  version: {},
  url: '',
  logo: '~src/assets/img/cat1.gif',
  type: 'application',
  restrictions: [],
  functionalities: []
}, {
  id: 'sgfdhgfh',
  guid: '',
  name: 'Konfigurator GPT',
  version: {},
  url: '',
  logo: '~src/assets/img/cat1.gif',
  type: 'application',
  restrictions: [],
  functionalities: []
}, {
  id: 'gdfghjf',
  guid: '',
  name: 'Konfigurator GPT',
  version: {},
  url: '',
  logo: '~src/assets/img/cat1.gif',
  type: 'configuration',
  restrictions: [],
  functionalities: []
}, {
  id: 'sgfdhwrtrtytruygfh',
  guid: '',
  name: 'Konfigurator GPT',
  version: {},
  url: '',
  logo: '~src/assets/img/cat1.gif',
  type: 'configuration',
  restrictions: [],
  functionalities: []
}];
