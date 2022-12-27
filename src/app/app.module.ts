import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/DashboardComponent/dashboard.component';
import { AddItemComponent } from './Components/AddItemComponent/add-item.component';
import { MaterialModule } from './Modules/material/material.module';
import { SoccerTrackerApiService } from './Services/SoccerTrackerApi/soccer-tracker-api.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { UpdateItemComponent } from './Components/UpdateItemComponent/update-item.component';
import { MatTableFilterModule } from 'mat-table-filter';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomePageComponent } from './Components/HomePageComponent/home-page.component';
import { LoginComponent } from './Components/LoginPageComponent/login.component';
import { FilterRangeComponent } from './Components/FilterRangeComponent/filter-range.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddItemComponent,
    UpdateItemComponent,
    HomePageComponent,
    LoginComponent,
    FilterRangeComponent
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

