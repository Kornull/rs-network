import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { RegistrationComponent } from './pages';
import { HeaderComponent } from './core/components';

import { ThemesService } from './core/services';
import { AuthActions } from './core/store/redux';

import { SnackbarComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RegistrationComponent,
    SnackbarComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'final';

  constructor(
    private theme: ThemesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.init());
    this.theme.default();
  }
}
