import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { FavoriteRoutingModule } from './favorite-routing.module';
import {
  FavoriteResultComponent,
  FavoriteComponent,
} from './components/favorite';

@NgModule({
  declarations: [FavoriteResultComponent, FavoriteComponent],
  imports: [CommonModule, SharedModule, FavoriteRoutingModule],
})
export class FavoriteModule {}
