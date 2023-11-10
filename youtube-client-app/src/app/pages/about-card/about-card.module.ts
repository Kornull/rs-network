import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';

import { CardBlockComponent, CardComponent } from './components';

import { AboutCardRoutingModule } from './about-card.routing.module';

@NgModule({
  declarations: [CardBlockComponent, CardComponent],
  imports: [CommonModule, AboutCardRoutingModule, SharedModule],
})
export class AboutCardModule {}
