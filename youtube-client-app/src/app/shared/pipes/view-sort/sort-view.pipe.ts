import { Pipe, PipeTransform } from '@angular/core';

import { FilterCommand, SearchItemDetails } from 'src/app/core/store';

@Pipe({
  name: 'sortView',
})
export class SortViewPipe implements PipeTransform {
  transform(cards: SearchItemDetails[], date = ''): SearchItemDetails[] {
    if (date === FilterCommand.UP) {
      return cards.sort((a: SearchItemDetails, b: SearchItemDetails) =>
        Number(a.statistics.viewCount) < Number(b.statistics.viewCount) ? 1 : -1
      );
    }
    if (date === FilterCommand.DOWN) {
      return cards.reverse();
    }
    return cards;
  }
}
