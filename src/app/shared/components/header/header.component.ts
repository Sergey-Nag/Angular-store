import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  userData$ = this.authService.user$;

  constructor(private authService: AuthService) { }

  onSignOut() {
    this.authService.signOut();
  }

}
