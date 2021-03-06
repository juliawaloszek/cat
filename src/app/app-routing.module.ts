import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './content/info/info.component';
import { ConfiguratorsListComponent } from './content/configurators-list/configurators-list.component';
import { ApplicationsListComponent } from './content/applications-list/applications-list.component';
import { EligibilityComponent } from './content/eligibility/eligibility.component';
import { SettingsComponent } from './content/settings/settings.component';

const routes: Routes = [{
  path: '',
  component: InfoComponent
// }, {
//   path: 'eligibility/',
//   component: EligibilityComponent
}, {
  path: 'eligibility/:name',
  component: EligibilityComponent
}, {
  path: 'eligibility/:name/:id',
  component: EligibilityComponent
// }, {
//   path: 'eligibility/applications/:id/:functionality',
//   component: EligibilityComponent
// }, {
//   path: 'eligibility/applications/:id/:functionality/:privilege',
//   component: EligibilityComponent
}, {
  path: 'configuration',
  component: ConfiguratorsListComponent
}, {
  path: 'configuration/:id',
  component: ConfiguratorsListComponent
}, {
  path: 'application',
  component: ApplicationsListComponent
}, {
  path: 'application/:id',
  component: ApplicationsListComponent
}, {
  path: 'settings',
  component: SettingsComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
