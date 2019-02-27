import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavigationComponent } from './content/navigation/navigation.component';
import { ApplicationsListComponent } from './content/applications-list/applications-list.component';
import { ConfiguratorsListComponent } from './content/configurators-list/configurators-list.component';
import { IframeComponent } from './components/iframe/iframe.component';
import { GridComponent } from './components/grid/grid.component';
import { TileComponent } from './components/tile/tile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ApplicationsListComponent,
    ConfiguratorsListComponent,
    IframeComponent,
    GridComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatRippleModule,
    MatGridListModule,
    MatTooltipModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
