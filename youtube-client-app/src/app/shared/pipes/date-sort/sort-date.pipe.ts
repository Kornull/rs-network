import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';

import { FilterCommand, CardDataType } from '../../../core/store';

@Pipe({
  name: 'sortDate',
})
export class SortDatePipe implements PipeTransform {
  transform(cards: CardDataType[], date: string = ''): CardDataType[] {
    if (date === FilterCommand.UP) {
      return cards.sort((a: CardDataType, b: CardDataType) =>
        dayjs(a.cardDetail.date, 'd') < dayjs(b.cardDetail.date, 'd') ? 1 : -1
      );
    }
    if (date === FilterCommand.DOWN) {
      return cards.sort((a: CardDataType, b: CardDataType) =>
        dayjs(a.cardDetail.date, 'd') < dayjs(b.cardDetail.date, 'd') ? -1 : 1
      );
    }
    return cards;
  }
}
