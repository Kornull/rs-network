import { Component } from '@angular/core';

import { ValidationService } from 'src/app/core/services/validation/validation.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  hide: boolean = true;

  loginValue: string = '';

  mailValue: string = '';

  constructor(private validationService: ValidationService) {}

  onValidate() {}
}
