import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFormComponent } from './components';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, AuthRoutingModule, MatIconModule, SharedModule],
})
export class AuthModule {}
