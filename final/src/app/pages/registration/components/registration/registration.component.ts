import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, switchMap, take, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../../../shared';
import { RegisterService, SnackBarService } from '../../../../core/services';
import { ErrorTypes, UserRegister } from '../../../../core/store/models';
import { AuthActions, selectIsUserLogged } from '../../../../core/store/redux';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  providers: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  hide: boolean = true;

  isDisabled: boolean = true;

  registerForm!: FormGroup;

  constructor(
    private regService: RegisterService,
    private fb: FormBuilder,
    private toast: SnackBarService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectIsUserLogged)
      .pipe(
        tap(res => {
          if (res) {
            this.router.navigate(['/']);
          }
        }),
        take(1)
      )
      .subscribe();
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.required,
          nameValidator(),
        ],
      ],
      email: ['', [Validators.email, Validators.required, emailValidator()]],
      password: [
        '',
        [passwordValidator(), Validators.minLength(8), Validators.required],
      ],
    });
  }

  onSubmit() {
    this.isDisabled = false;
    const regData: UserRegister = {
      email: this.registerForm.controls['email'].value,
      name: this.registerForm.controls['name'].value,
      password: this.registerForm.controls['password'].value,
    };
    const http$ = this.regService.userSignUp(regData);

    http$
      .pipe(
        switchMap(() => {
          this.toast.openSnack('Registration success', false);
          this.router.navigate(['./signin']);
          return EMPTY;
        }),
        catchError(err => {
          const { error } = err;

          if (error === null) {
            this.toast.openSnack(err.statusText, true);
          }

          if (error.type === ErrorTypes.USER_EXIST) {
            this.toast.openSnack(error.message, true);
            this.registerForm.controls['email'].setErrors({
              emailExist: true,
            });
            this.isDisabled = true;
            this.store.dispatch(
              AuthActions.invalidRegister({
                email: this.registerForm.controls['email'].value,
              })
            );
          }

          if (error.type === ErrorTypes.INVALID_REG_FORM) {
            this.toast.openSnack(error.message, true);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }
}
