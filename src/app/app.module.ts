import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddItemComponent } from './Components/add-item/add-item.component';
import { MaterialModule } from './Modules/material/material.module';
import { SoccerTrackerApiService } from './Services/SoccerTrackerApi/soccer-tracker-api.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { UpdateItemComponent } from './Components/update-item/update-item.component';
import { MatTableFilterModule } from 'mat-table-filter';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginComponent } from './Components/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddItemComponent,
    UpdateItemComponent,
    HomePageComponent,
    LoginComponent
  ],
  entryComponents: [
    DashboardComponent,
    AddItemComponent,
    UpdateItemComponent,
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableFilterModule,

  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, SoccerTrackerApiService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

