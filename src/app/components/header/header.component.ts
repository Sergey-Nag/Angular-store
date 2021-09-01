import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userdata!: {username: string, avatar: string};
  userSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User | null) => {
      if (!user) return;

      const { username, avatar } = user;
      this.userdata = { username, avatar };
    });
  }

  onSignOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
