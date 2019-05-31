import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule, MatButtonModule, MatTableModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material';
import { MatTreeModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { ApplicationsListComponent } from './content/applications-list/applications-list.component';
import { ConfiguratorsListComponent } from './content/configurators-list/configurators-list.component';
import { IframeComponent } from './components/iframe/iframe.component';
import { GridComponent } from './components/grid/grid.component';
import { TileComponent } from './components/tile/tile.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './content/info/info.component';
import { ListComponent } from './components/list/list.component';
import { EligibilityComponent } from './content/eligibility/eligibility.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ApplicationInfoComponent } from './components/application-info/application-info.component';
import { GroupInfoComponent } from './content/eligibility/group-info/group-info.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';
import { InterpolateDialogComponent } from './content/eligibility/interpolate-dialog/interpolate-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationsListComponent,
    ConfiguratorsListComponent,
    IframeComponent,
    GridComponent,
    TileComponent,
    FooterComponent,
    InfoComponent,
    ListComponent,
    EligibilityComponent,
    UserInfoComponent,
    ApplicationInfoComponent,
    GroupInfoComponent,
    SimpleTableComponent,
    InterpolateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatRippleModule,
    MatGridListModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InterpolateDialogComponent]
})
export class AppModule { }
