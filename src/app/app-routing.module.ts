import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorsListComponent } from './content/configurators-list/configurators-list.component';
import { ApplicationsListComponent } from './content/applications-list/applications-list.component';

const routes: Routes = [{
  path: 'configurations',
  component: ConfiguratorsListComponent
}, {
  path: 'applications',
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
