import { Pipe, PipeTransform } from '@angular/core';

import { CardDataType } from 'src/app/core/store';

@Pipe({
  name: 'filterTitleCards',
})
export class FilterCardsPipe implements PipeTransform {
  transform(cards: CardDataType[], title: string = ''): CardDataType[] {
    if (title.trim()) {
      const filterTitle = cards.filter((card: CardDataType) =>
        card.value.title.toLowerCase().includes(title.toLowerCase())
      );

      const subTitle = cards.filter((card: CardDataType) =>
        card.value.subTitle.toLowerCase().includes(title.toLowerCase())
      );

      return [...new Set([...filterTitle, ...subTitle])];
    }

    return cards;
  }
}
