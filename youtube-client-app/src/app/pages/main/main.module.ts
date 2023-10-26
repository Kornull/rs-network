import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ResultSearchComponent } from './result-search/result-search.component';
import { ResultItemComponent } from './result-item/result-item.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ResultSearchComponent,
    ResultItemComponent,
    MainRoutingModule,
    SharedModule,
  ],
  exports: [MainComponent],
})
export class MainPageModule {}
