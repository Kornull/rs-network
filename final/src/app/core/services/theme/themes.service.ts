import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { LocalStoreKeys } from '../../store/models';
import { selectTheme } from '../../store/redux';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private theme: string = '';

  private render: Renderer2;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private rendererFactory: RendererFactory2,
    private store: Store
  ) {
    this.render = rendererFactory.createRenderer(null, null);
    this.store
      .select(selectTheme)
      .pipe(map(theme => (this.theme = theme)))
      .subscribe();
  }

  changeTheme() {
    if (this.theme === 'lightTheme') {
      this.render.removeClass(this.document.body, this.theme);
      this.theme = 'darkTheme';
    } else {
      this.render.removeClass(this.document.body, this.theme);
      this.theme = 'lightTheme';
    }

    this.render.addClass(this.document.body, this.theme);
    localStorage.setItem(LocalStoreKeys.THEME, JSON.stringify(this.theme));
  }
}
