import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { FavoriteComponent } from './components/favorite/favorite.component';
import { FavoriteResultComponent } from './components/favorite-result/favorite-result.component';

@NgModule({
  declarations: [FavoriteComponent, FavoriteResultComponent],
  imports: [CommonModule, SharedModule],
  exports: [FavoriteResultComponent],
})
export class FavoriteModule {}
