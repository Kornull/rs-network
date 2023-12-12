import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private theme: string | null = this.localStore.getThemeApp();

  private render: Renderer2;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private rendererFactory: RendererFactory2,
    private localStore: LocalStorageService
  ) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  changeTheme() {
    if (this.theme === 'lightTheme') {
      this.render.removeClass(this.document.body, this.theme);
      this.theme = 'darkTheme';
    } else {
      this.render.removeClass(this.document.body, 'darkTheme');
      this.theme = 'lightTheme';
    }

    this.render.addClass(this.document.body, this.theme);
    this.localStore.setThemeApp(this.theme);
  }
}
