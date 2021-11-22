import { Component } from '@angular/core';
import { AuthService } from './Services/AuthService/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SoccerTracker';

  isAuthenticated = false;

  /**
   *
   */
  constructor(public authService: AuthService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated:boolean) => this.isAuthenticated = isAuthenticated
    );
  }
  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  async logout(): Promise<void> {
    await this.authService.logout('/');
  }
}
