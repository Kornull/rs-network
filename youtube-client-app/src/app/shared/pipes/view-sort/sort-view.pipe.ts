import { Pipe, PipeTransform } from '@angular/core';

import { FilterCommand, CardDataType } from 'src/app/core/store';

@Pipe({
  name: 'sortView',
})
export class SortViewPipe implements PipeTransform {
  transform(cards: CardDataType[], date = ''): CardDataType[] {
    if (date === FilterCommand.UP) {
      return cards.sort((a: CardDataType, b: CardDataType) =>
        Number(a.value.statistics?.viewCount) <
        Number(b.value.statistics?.viewCount)
          ? 1
          : -1
      );
    }
    if (date === FilterCommand.DOWN) {
      return cards.reverse();
    }
    return cards;
  }
}
