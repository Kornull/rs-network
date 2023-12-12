import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, map } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { passwordValidator } from '../../shared';
import { AuthService, SnackBarService } from '../../core/services';
import {
  ErrorTypes,
  LocalStoreKeys,
  UserLogin,
  UserLoginSuccess,
  UserRegisterData,
} from '../../core/store/models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  hide: boolean = true;

  isDisabled: boolean = true;

  authForm!: FormGroup;

  isErrorRequest: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snack: SnackBarService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [passwordValidator(), Validators.minLength(8), Validators.required],
      ],
    });

    this.authForm.valueChanges.subscribe(() => {
      if (this.isErrorRequest && this.authForm.controls['email'].valid) {
        this.authForm.controls['password'].setErrors(null);
        this.isErrorRequest = false;
      }
      if (this.isErrorRequest && this.authForm.controls['password'].valid) {
        this.authForm.controls['email'].setErrors(null);
        this.isErrorRequest = false;
      }
    });
  }

  onSubmit() {
    this.isDisabled = false;

    const data: UserLogin = {
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value,
    };
    const http$ = this.authService.auth(data);

    http$
      .pipe(
        map((res: UserLoginSuccess) => {
          const userLoggedInfo: UserRegisterData = {
            email: this.authForm.controls['email'].value,
            uid: res.uid,
            token: res.token,
          };
          localStorage.setItem(
            LocalStoreKeys.AUTH_USER,
            JSON.stringify(userLoggedInfo)
          );
          this.snack.openSnack('Login success', false);
          this.isErrorRequest = false;
          this.isDisabled = true;
          this.router.navigate(['/']);
        }),
        catchError(err => {
          const { error } = err;
          if (error.type === ErrorTypes.USER_ERROR_LOGIN) {
            this.snack.openSnack(error.message, true);
            this.authForm.controls['email'].setErrors({
              isEmailExist: true,
            });
            this.authForm.controls['password'].setErrors({
              isPasswordExist: true,
            });
            this.isDisabled = true;
            this.isErrorRequest = true;
          }
          if (error.type === ErrorTypes.INVALID_LOGIN_FORM) {
            this.snack.openSnack(error.message, true);
          }
          throw new Error(`Login Error - ${error.message}`);
        })
      )
      .subscribe();
  }
}
