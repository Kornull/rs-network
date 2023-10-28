import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
