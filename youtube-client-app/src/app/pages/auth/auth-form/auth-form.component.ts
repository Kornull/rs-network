import { Component, OnInit } from '@angular/core';

import { LoginService, LocalStorageService } from 'src/app/core/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  isHiddenPassword: boolean = true;

  signInForm: FormGroup;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        passwordValidator(),
      ]),
    });
  }

  constructor(
    private localStorageService: LocalStorageService,
    private loginService: LoginService
  ) {}

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
