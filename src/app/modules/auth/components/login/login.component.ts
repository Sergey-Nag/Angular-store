import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(form: NgForm) {
    if (form.invalid) return;
    
    this.isLoading = true;

    this.authService
      .signIn(form.value.username)
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/']);
      });
  }
}
