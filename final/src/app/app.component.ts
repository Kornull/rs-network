import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { HeaderComponent } from './core/components';
import { SnackbarComponent } from './shared';

import { AuthActions } from './core/store/redux';

import { AppTheme } from './core/store/models';

import AuthService from './core/services/auth/auth.service';
import LocalStorageService from './core/services/local-storage/local-storage.service';
import RegisterService from './core/services/register/register.service';
import SnackBarService from './core/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SnackbarComponent,
    HttpClientModule,
  ],
  providers: [
    RegisterService,
    AuthService,
    SnackBarService,
    LocalStorageService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'final';

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private store: Store,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.init());
  }

  onChangeTheme($event: string) {
    if ($event === AppTheme.LIGHT) {
      this.render.removeClass(this.document.body, AppTheme.DARK);
    } else {
      this.render.removeClass(this.document.body, AppTheme.LIGHT);
    }
    this.render.addClass(this.document.body, $event);
  }
}
