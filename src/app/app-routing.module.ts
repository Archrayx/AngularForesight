import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddItemComponent } from './Components/add-item/add-item.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuardService } from './Services/AuthGuard/auth-guard.service';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  { path: 'dashboard', component: DashboardComponent/*,canActivate: [ AuthGuardService ]<-- incase i wanted to implement redirect bind if not logged in */},
  {path:"login", component:LoginComponent},
  {path:"home", component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
