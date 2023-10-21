import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

import * as dayjs from 'dayjs';

enum UpdatedTime {
  SEVEN_DAYS = 7,
  MONTH = 30,
  HALF_YEAR = 180,
}

enum ColorCards {
  YELLOW = 'yellow',
  GREEN = 'green',
  RED = 'red',
  BLUE = 'blue',
}

@Directive({
  selector: '[appDefaultColorCard]',
})
export class DefaultColorCardDirective implements OnChanges {
  @Input('appDefaultColorCard') updatedDate!: string;

  dateNow = dayjs(new Date());

  constructor(
    private elRef: ElementRef,
    private render: Renderer2
  ) {}

  ngOnChanges(): void {
    const dayNow: number = this.dateNow.diff(this.updatedDate, 'day');

    if (dayNow < UpdatedTime.SEVEN_DAYS) {
      this.render.setStyle(
        this.elRef.nativeElement,
        'background-color',
        ColorCards.BLUE
      );
    } else if (dayNow > UpdatedTime.SEVEN_DAYS && dayNow <= UpdatedTime.MONTH) {
      this.render.setStyle(
        this.elRef.nativeElement,
        'background-color',
        ColorCards.GREEN
      );
    } else if (dayNow > UpdatedTime.MONTH && dayNow <= UpdatedTime.HALF_YEAR) {
      this.render.setStyle(
        this.elRef.nativeElement,
        'background-color',
        ColorCards.YELLOW
      );
    } else {
      this.render.setStyle(
        this.elRef.nativeElement,
        'background-color',
        ColorCards.RED
      );
    }
  }
}
