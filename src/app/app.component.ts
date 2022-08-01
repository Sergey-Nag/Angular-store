import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth$ = this.authService.user.pipe(map(user => !!user));

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoSignIn();
  }
}
