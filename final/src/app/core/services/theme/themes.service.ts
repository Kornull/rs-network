import { Injectable, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private theme: string = 'lightTheme';

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private render: Renderer2
  ) {}

  default(): void {
    this.render.addClass(this.document.body, this.theme);
  }

  changeTheme() {
    if (this.theme === 'lightTheme') {
      this.theme = 'darkTheme';
      this.render.removeClass(this.document.body, 'lightTheme');
    } else {
      this.theme = 'lightTheme';
      this.render.removeClass(this.document.body, 'darkTheme');
    }

    this.render.addClass(this.document.body, this.theme);
  }
}
