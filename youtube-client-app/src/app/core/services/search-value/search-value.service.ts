import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchValueService {
  private searchValue$ = new Subject<string>();

  setValue(str: string): void {
    this.searchValue$.next(str);
  }

  getSearchValue(): Subject<string> {
    return this.searchValue$;
  }
}
