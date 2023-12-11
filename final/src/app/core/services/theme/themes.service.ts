import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private theme: string = 'lightTheme';

  private render: Renderer2;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  default(): void {
    this.render.addClass(this.document.body, this.theme);
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
  }
}
