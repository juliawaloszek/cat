import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './content/sidenav/sidenav.component';
import { AppmenuComponent } from './content/appmenu/appmenu.component';
import { ConfiguratorsListComponent } from './content/configurators-list/configurators-list.component';

const routes: Routes = [{
  path: 'configapps',
  component: ConfiguratorsListComponent
}, {
  path: 'appmenu',
  component: AppmenuComponent
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
