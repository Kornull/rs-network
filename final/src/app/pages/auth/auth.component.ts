import { Component, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { emailValidator, passwordValidator } from '../../shared';
import { AuthService } from '../../core/services';
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

  isSubmit: boolean = true;

  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, emailValidator()]],
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
      if (res.type === ErrorTypes.INVALID_LOGIN_FORM) {
        this.openSnackBar(res.message, true);
        this.registerForm.controls['email'].setErrors({
          isEmailExist: true,
        });
        this.registerForm.controls['password'].setErrors({
          isPasswordExist: true,
        });
        this.isDisabled = true;
      } else if (res.type === ErrorTypes.INVALID_REG_FORM) {
        this.openSnackBar(res.message, true);
      } else {
        this.openSnackBar('Login success', false);
      }
    });
  }

  openSnackBar(content: string, isError: boolean) {
    this.snackBar.open(content, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [isError ? 'alert-red' : 'alert-green'],
    });
  }
}
