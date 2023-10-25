import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {
  CustomButtonComponent,
  FilterListComponent,
  HeaderComponent,
  HeaderFilterComponent,
  HeaderSearchComponent,
  HeaderUserLoginComponent,
} from './components';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    CustomButtonComponent,
    FilterListComponent,
    HeaderComponent,
    HeaderSearchComponent,
    HeaderUserLoginComponent,
    HeaderFilterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CoreModule {}
