import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FilterListComponent,
  HeaderComponent,
  HeaderFilterComponent,
  HeaderSearchComponent,
  HeaderUserLoginComponent,
} from './components';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    FilterListComponent,
    HeaderComponent,
    HeaderSearchComponent,
    HeaderUserLoginComponent,
    HeaderFilterComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
