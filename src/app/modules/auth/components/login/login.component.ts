import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VALIDATION_ERROR } from '@shared/helpers/validation-error.helper';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email,
      Validators.maxLength(40),
    ])
  }, { updateOn: 'blur'});

  constructor(private authService: AuthService, private router: Router) {}

  isControlInvalid(controlName: string): boolean {
    return this.authForm.controls[controlName].touched && this.authForm.controls[controlName].invalid;
  }

  getControlErrorMessage(controlName: string): string[] {
    return Object.keys(
        this.authForm.controls[controlName].errors || []
      )
      .map((errorKey) => VALIDATION_ERROR[errorKey]);
  }

  handleSubmit() {
    if (this.authForm.invalid) return;
    
    this.startLoading();

    this.authService
      .signIn(this.authForm.value.username)
      .subscribe(() => {
        this.finishLoading();
        this.router.navigate(['/']);
      });
  }

  private startLoading() {
    this.isLoading = true;
    this.authForm.get('username').disable();
  }

  private finishLoading() {
    this.isLoading = false;
    this.authForm.get('username').enable();
  }
}
