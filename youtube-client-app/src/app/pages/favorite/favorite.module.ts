import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';

import { FavoriteResultComponent } from './components/favorite/favorite-result/favorite-result.component';
import { FavoriteCardComponent } from './components/favorite/favorite-card/favorite-card.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [
    FavoriteCardComponent,
    FavoriteResultComponent,
    FavoriteComponent,
  ],
  imports: [CommonModule, SharedModule, FavoriteRoutingModule],
})
export class FavoriteModule {}
