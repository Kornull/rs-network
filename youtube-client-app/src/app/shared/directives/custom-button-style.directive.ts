import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { DefaultDataCustomBtn } from 'src/app/core/store/models/types';

@Directive({
  selector: '[appCustomButtonStyle]',
})
export class CustomButtonStyleDirective implements OnChanges {
  @Input('appCustomButtonStyle') buttonStyleSettings: string =
    DefaultDataCustomBtn.DEFAULT;

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2
  ) { }

  ngOnChanges(): void {
    switch (this.buttonStyleSettings) {
      case DefaultDataCustomBtn.SETTINGS:
        this.render.setStyle(this.elementRef.nativeElement,'padding','6px');
        return;
      case DefaultDataCustomBtn.SEARCH:
        this.render.setStyle(
          this.elementRef.nativeElement,
          'padding',
          '6px 10px'
        );
        return;
      default:
        this.render.setStyle(
          this.elementRef.nativeElement,
          'padding',
          '16px 4px'
        );
    }
  }
}
