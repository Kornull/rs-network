import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { MainRoutingModule } from './main-routing.module';
import { AboutCardRoutingModule } from '../about-card';
import { AdminRoutingModule } from '../admin';

import {
  MainComponent,
  ResultItemComponent,
  ResultSearchComponent,
} from './components';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ResultSearchComponent,
    ResultItemComponent,
    MainRoutingModule,
    AboutCardRoutingModule,
    AdminRoutingModule,
    SharedModule,
  ],
  exports: [MainComponent],
})
export class MainPageModule {}
