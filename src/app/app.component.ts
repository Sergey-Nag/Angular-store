import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth = this.authService.isAuth;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoSignIn();
  }
}
