import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { HeaderComponent } from './core/components';
import { SnackbarComponent } from './shared';

import { AuthActions, selectTheme } from './core/store/redux';
import {
  AuthService,
  LocalStorageService,
  RegisterService,
  SnackBarService,
} from './core/services';
import { ProfileComponent } from './pages/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SnackbarComponent,
    HttpClientModule,
    ProfileComponent,
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

  theme$: Observable<string>;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private store: Store,
    private render: Renderer2
  ) {
    this.theme$ = this.store.select(selectTheme);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.init());
    this.theme$
      .pipe(map(theme => this.render.addClass(this.document.body, theme)))
      .subscribe();
  }
}
