import { Pipe, PipeTransform } from '@angular/core';

import { SearchItemDetails } from 'src/app/core/store';

@Pipe({
  name: 'filterTitleCards',
})
export class FilterCardsPipe implements PipeTransform {
  transform(
    cards: SearchItemDetails[],
    title: string = ''
  ): SearchItemDetails[] {
    if (title.trim()) {
      const filterTitle = cards.filter((card: SearchItemDetails) =>
        card.snippet.channelTitle.toLowerCase().includes(title.toLowerCase())
      );

      const subTitle = cards.filter((card: SearchItemDetails) =>
        card.snippet.localized.title.toLowerCase().includes(title.toLowerCase())
      );

      return [...new Set([...filterTitle, ...subTitle])];
    }

    return cards;
  }
}
