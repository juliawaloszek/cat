import { Plugin } from '../model/plugin';

export const APPS: Plugin[] = [{
  id: 'gpt-conf',
  name: 'Konfigurator GPT',
  url: 'https://vm-kajko:8181/app-gpt-configurator/modules/portal/index.xhtml',
  logo: 'assets/img/gpt-logo.png',
  type: 'configuration',
  description: 'Aplikacja konfiguracyjna Geoportal Toolkit',
  properties: {}
}, {
  id: 'gpt-app',
  name: 'GPT',
  url: 'https://vm-kajko:8181/gpt4-dev',
  logo: 'assets/img/gpt-logo.png',
  type: 'application',
  description: 'Aplikacja mapowa Geoportal Toolkit',
  properties: {}
}, {
  id: 'lelum-polelum',
  name: 'Lelum Polelum',
  url: '',
  logo: 'assets/img/gpt-logo.png',
  type: 'configuration',
  description: '',
  properties: {}
}, {
  id: 'gpt-conf',
  name: 'Konfigurator GPT',
  url: '',
  logo: 'assets/img/gpt-logo.png',
  type: 'application',
  description: '',
  properties: {}
}, {
  id: 'dfasfasdfsd',
  name: 'ONET',
  url: 'http://www.onet.pl',
  logo: 'assets/img/cat.png',
  type: 'configuration',
  description: '',
  properties: {}
}, {
  id: 'sgfdhgfh',
  name: 'Jakaś inna aplikacja',
  url: '',
  logo: '~src/assets/img/cat.png',
  type: 'application',
  description: '',
  properties: {}
}, {
  id: 'sgfdhgfh',
  name: 'JUUUUUU',
  url: '',
  logo: 'assets/img/cat.png',
  type: 'application',
  description: '',
  properties: {}
}, {
  id: 'sgfdhgfh',
  name: 'AJ WAJ',
  url: '',
  logo: 'assets/img/cat.png',
  type: 'application',
  description: '',
  properties: {}
}, {
  id: 'gdfghjf',
  name: 'HUHU',
  url: '',
  logo: 'assets/img/cat.png',
  type: 'configuration',
  description: '',
  properties: {}
}, {
  id: 'sgfdhwrtrtytruygfh',
  name: 'JUPI',
  url: '',
  logo: 'assets/img/cat.png',
  type: 'configuration',
  description: '',
  properties: {}
}];

// restrictions: [{
//   id: 'gpt-tool-appliform',
//   name: 'Narzędzie składania wniosków',
//   valueType: 'boolean',
//   values: ['true', 'false']
// }],
//   functionalities: [{
//   id: 'print',
//   name: 'Drukowanie mapy',
//   privileges: [{
//     id: 'print-res',
//     name: 'Maksymalna rozdzielczość wydruku',
//     type: 'integer',
//     values: [{
//       value: 300,
//       description: 'Rozdzielczość 300 dpi'
//     }],
//     value: '300'
//   }]
// }, {
//   id: 'nana',
//   name: 'Nuna Nanu',
//   privileges: []
// }],
//   plugin: {}
