import { SoccerTrackerApiService } from './Services/soccer-tracker-api.service';
import { Component } from '@angular/core';
import { AuthService } from './Services/AuthService/auth.service';
import { startWith } from 'rxjs/operators';
const CACHE_KEY = "dashboard_key";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Foresight Soccer';

  isAuthenticated = false;
  repo: any;

  /**
   *
   */
  constructor(public authService: AuthService, public service:SoccerTrackerApiService) {

    this.authService.isAuthenticated.subscribe(
      (isAuthenticated:boolean) => this.isAuthenticated = isAuthenticated
    );


  }
  async ngOnInit(): Promise<void> {
    // this.repo = this.service.listEntry();
    // this.repo.subscribe((x: any) => {
    //   if (localStorage[CACHE_KEY] == undefined) {
    //     console.log("is empty! storing data...");
    //     localStorage[CACHE_KEY] = JSON.stringify(x);
    //   }
    //   console.log("stored");
    // })
    //this.repo = this.repo.pipe(startWith(JSON.parse(localStorage[CACHE_KEY] || '[]')));
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  async logout(): Promise<void> {
    await this.authService.logout('/');
  }
}
