import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { emailValidator, passwordValidator } from '../../shared';
import { RegisterService, SnackBarService } from '../../core/services';
import { ErrorTypes } from '../../core/store/models';
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
    private store: Store
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
    const http$ = this.regService.reg();

    http$.subscribe(res => {
      if (res.type === ErrorTypes.USER_EXIST) {
        this.snack.openSnack(res.message, true);
        this.registerForm.controls['email'].setErrors({
          emailExist: true,
        });
        this.isDisabled = true;
        this.store.dispatch(
          AuthActions.invalidRegister({
            email: this.registerForm.controls['email'].value,
          })
        );
      } else if (res.type === ErrorTypes.INVALID_REG_FORM) {
        this.snack.openSnack(res.message, true);
      } else {
        this.snack.openSnack('Registration success', false);
      }
    });
  }
}
