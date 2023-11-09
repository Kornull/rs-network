import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ResultSearchComponent } from './result-search/result-search.component';
import { ResultItemComponent } from './result-item/result-item.component';
import { AboutCardRoutingModule } from '../about-card/about-card.routing.module';
import { AdminRoutingModule } from '../admin';

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
