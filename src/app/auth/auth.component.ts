import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy, OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.setAuth(false);
  }

  ngOnDestroy() {
    this.authService.setAuth(true);
  }

}
