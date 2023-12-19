import { Pipe, PipeTransform } from '@angular/core';
import { GroupMessagesDataType } from '../../core/store/models';

@Pipe({
  name: 'sortingMessages',
  standalone: true,
})
export class SortingMessagesPipe implements PipeTransform {
  transform(value: GroupMessagesDataType[]): GroupMessagesDataType[] {
    return value.sort((a, b) => +a.time - +b.time);
  }
}
