import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth = true;

  constructor(private authService: AuthService) {
    this.authService.auth.subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
    });
  }
}
