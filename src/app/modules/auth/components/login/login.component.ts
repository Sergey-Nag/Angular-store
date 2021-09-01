import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  avatarUrl = '../../../assets/unknown-guy.svg';
  isLoading = false;
  isLogined = false;
  placeholder: {name: string, time: number, interval: number | null} = {
    name: '',
    time: 5,
    interval: null
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnDestroy() {
    if (this.placeholder.interval) {
      clearInterval(this.placeholder.interval);
    }
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) return;
    
    this.isLoading = true;

    this.authService
      .signIn(form.value.username)
      .subscribe((data: AuthResponseData) => {
        this.avatarUrl = data.avatar;

        this.placeholder.name = data.username;
        this.placeholder.interval = setInterval(() => {
          this.placeholder.time = --this.placeholder.time;

          if (this.placeholder.time === 0) {
            this.router.navigate(['/']);
            this.authService.setAuth(true);
          }
        }, 1000);

        this.isLoading = false;
        this.isLogined = true;
      });
  }

}
