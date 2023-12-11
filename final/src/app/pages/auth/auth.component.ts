import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { passwordValidator } from '../../shared';
import { AuthService, SnackBarService } from '../../core/services';
import { ErrorTypes } from '../../core/store/models';

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
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  hide: boolean = true;

  isDisabled: boolean = true;

  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snack: SnackBarService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [passwordValidator(), Validators.minLength(8), Validators.required],
      ],
    });
  }

  onSubmit() {
    this.isDisabled = false;
    const http$ = this.authService.auth();

    http$.subscribe(res => {
      if (res.type === ErrorTypes.USER_ERROR_LOGIN) {
        this.snack.openSnack(res.message, true);
        this.authForm.controls['email'].setErrors({
          isEmailExist: true,
        });
        this.authForm.controls['password'].setErrors({
          isPasswordExist: true,
        });
        this.isDisabled = true;
      } else if (res.type === ErrorTypes.INVALID_LOGIN_FORM) {
        this.snack.openSnack(res.message, true);
      } else {
        this.snack.openSnack('Login success', false);
      }
    });
  }
}
