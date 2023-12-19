import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs';
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

import { emailValidator, passwordValidator } from '../../shared';
import { RegisterService, SnackBarService } from '../../core/services';
import { ErrorTypes, UserRegister } from '../../core/store/models';
import { AuthActions } from '../../core/store/redux';

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
    private snack: SnackBarService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(12),
          Validators.required,
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
        map(() => {
          this.snack.openSnack('Registration success', false);
          this.router.navigate(['./signin']);
        }),
        catchError(err => {
          const { error } = err;

          if (error.type === ErrorTypes.USER_EXIST) {
            this.snack.openSnack(error.message, true);
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
            this.snack.openSnack(error.message, true);
          }
          throw new Error(`Registration Error - ${error.message}`);
        })
      )
      .subscribe();
  }
}
