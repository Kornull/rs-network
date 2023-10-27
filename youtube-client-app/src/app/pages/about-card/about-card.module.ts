import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { AboutCardRoutingModule } from './about-card.routing.module';

@NgModule({
  declarations: [CardComponent, CardComponent],
  imports: [CommonModule, AboutCardRoutingModule],
})
export class AboutCardModule {}
