import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SharedModule } from 'src/app/shared';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent, AdminFormComponent } from './components/admin';

@NgModule({
  declarations: [AdminComponent, AdminFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
})
export class AdminModule {}
