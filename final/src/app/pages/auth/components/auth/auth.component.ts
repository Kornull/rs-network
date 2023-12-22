import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { passwordValidator } from '../../../../shared';

import {
  ErrorTypes,
  UserLogin,
  UserLoginSuccess,
} from '../../../../core/store/models';
import { AuthActions, selectIsUserLogged } from '../../../../core/store/redux';

import AuthService from '../../../../core/services/auth/auth.service';
import SnackBarService from '../../../../core/services/snack-bar/snack-bar.service';
import LocalStorageService from '../../../../core/services/local-storage/local-storage.service';

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

  httpSubscribe$!: Subscription;

  isErrorRequest: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toast: SnackBarService,
    private store: Store,
    private router: Router,
    private localStor: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectIsUserLogged)
      .pipe(
        tap(res => {
          if (res) {
            this.router.navigate(['/']);
          }
        })
      )
      .subscribe();
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
        tap((res: UserLoginSuccess) => {
          this.localStor.loginSuccess({
            email: this.authForm.controls['email'].value,
            uid: res.uid,
            token: res.token,
          });
          this.toast.openSnack('Login success', false);
          this.isErrorRequest = false;
          this.isDisabled = true;
          this.router.navigate(['/']);
          this.store.dispatch(AuthActions.checkUserLogin());
        }),
        catchError((err: HttpErrorResponse) => {
          const { error } = err;

          if (error === null || error.type === 'error') {
            this.toast.openSnack(err.statusText, true);
            this.isDisabled = true;
            return EMPTY;
          }

          if (error.type === ErrorTypes.USER_ERROR_LOGIN) {
            this.toast.openSnack(error.message, true);
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
            this.toast.openSnack(error.message, true);
          }

          return EMPTY;
        })
      )
      .subscribe();
  }
}
