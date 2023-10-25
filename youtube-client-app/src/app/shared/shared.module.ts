import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CustomButtonStyleDirective,
  DefaultColorCardDirective,
} from './directives';

@NgModule({
  declarations: [CustomButtonStyleDirective],
  imports: [CommonModule, DefaultColorCardDirective],
  exports: [CustomButtonStyleDirective],
})
export class SharedModule {}
