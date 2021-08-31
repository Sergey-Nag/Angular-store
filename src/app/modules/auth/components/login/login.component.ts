import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  constructor(private authService: AuthService) {
    this.authService.setAuth(false);
  }

  ngOnDestroy() {
    this.authService.setAuth(true);
  }

}
