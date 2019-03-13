import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './content/info/info.component';
import { ConfiguratorsListComponent } from './content/configurators-list/configurators-list.component';
import { ApplicationsListComponent } from './content/applications-list/applications-list.component';

const routes: Routes = [{
  path: '',
  component: InfoComponent
}, {
  path: 'configuration',
  component: ConfiguratorsListComponent
}, {
  path: 'application',
  component: ApplicationsListComponent
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
