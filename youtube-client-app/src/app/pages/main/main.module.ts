import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { MainRoutingModule } from './main-routing.module';
import { AboutCardRoutingModule } from '../about-card';
import { AdminRoutingModule } from '../admin';

import { MainComponent, ResultSearchComponent } from './components';
import { FavoriteRoutingModule } from '../favorite';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ResultSearchComponent,
    MainRoutingModule,
    AboutCardRoutingModule,
    AdminRoutingModule,
    FavoriteRoutingModule,
    SharedModule,
  ],
  exports: [MainComponent],
})
export class MainPageModule {}
