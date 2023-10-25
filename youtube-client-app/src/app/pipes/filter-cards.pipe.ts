import { Pipe,PipeTransform } from '@angular/core';
import { SearchItem } from '../core/store/models/search-item.model';

@Pipe({
  name: 'filterTitleCards',
})
export class FilterCardsPipe implements PipeTransform {
  transform(cards: SearchItem[],title: string = ''): SearchItem[] {
    if (title.trim()) {
      const filterTitle = cards.filter((card: SearchItem) =>
        card.snippet.channelTitle.toLowerCase().includes(title.toLowerCase())
      );

      const subTitle = cards.filter((card: SearchItem) =>
        card.snippet.localized.title.toLowerCase().includes(title.toLowerCase())
      );

      return [...new Set([...filterTitle,...subTitle])];
    }

    return cards;
  }
}
