import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService, LocalStorageService } from 'src/app/core/services';
import { passwordValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  isHiddenPassword: boolean = true;

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.minLength(8), Validators.required, passwordValidator()],
      ],
    });
  }

  onShowPassword(): boolean {
    this.isHiddenPassword = !this.isHiddenPassword;
    return this.isHiddenPassword;
  }

  onSignIn(): void {
    this.loginService.createUser({
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    });
    this.localStorageService.addUserLocalStore({
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    });
    this.signInForm.reset();
  }
}
