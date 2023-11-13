import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';

import { FilterCommand, SearchItemDetails } from '../../../core/store';

@Pipe({
  name: 'sortDate',
})
export class SortDatePipe implements PipeTransform {
  transform(
    cards: SearchItemDetails[],
    date: string = ''
  ): SearchItemDetails[] {
    if (date === FilterCommand.UP) {
      return cards.sort((a: SearchItemDetails, b: SearchItemDetails) =>
        dayjs(a.snippet.publishedAt, 'd') < dayjs(b.snippet.publishedAt, 'd')
          ? 1
          : -1
      );
    }
    if (date === FilterCommand.DOWN) {
      return cards.sort((a: SearchItemDetails, b: SearchItemDetails) =>
        dayjs(a.snippet.publishedAt, 'd') < dayjs(b.snippet.publishedAt, 'd')
          ? -1
          : 1
      );
    }
    return cards;
  }
}
