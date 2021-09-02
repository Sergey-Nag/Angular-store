import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, interval } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  avatarUrl = '../../../assets/unknown-guy.svg';
  isLoading = false;
  loadedData = new BehaviorSubject<{name: string, time: number}>(null);

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(form: NgForm) {
    if (form.invalid) return;
    
    this.isLoading = true;

    this.authService
      .signIn(form.value.username)
      .subscribe((data: User) => {
        this.avatarUrl = data.avatar;

        this.loadedData.next({
          name: data.username,
          time: 5
        });

        interval(1000)
          .pipe(
            take(5),
            tap((x) => {
              this.loadedData.next({
                name: data.username,
                time: 5 - (x + 1)
              });
            }),
            finalize(()=> {
              this.router.navigate(['/']);
              this.authService.setAuth(true);
            })
          )
          .subscribe()

        this.isLoading = false;
      });
  }

}
