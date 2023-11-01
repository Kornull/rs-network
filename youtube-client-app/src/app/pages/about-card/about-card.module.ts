import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';

import { CardComponent } from './card/card.component';
import { AboutCardRoutingModule } from './about-card.routing.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, AboutCardRoutingModule, SharedModule],
})
export class AboutCardModule {}
