import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AppmenuComponent } from '../appmenu/appmenu.component';

const routes: Routes = [{
  path: 'sidenav',
  component: SidenavComponent
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
