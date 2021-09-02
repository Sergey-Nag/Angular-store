import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth = false;

  constructor(private authService: AuthService) {
    this.authService.isAuth.subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
    });
  }

  ngOnInit() {
    this.authService.autoSignIn();
  }
}
