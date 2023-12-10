import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components';
import { ThemesService } from './core/services';
import { RegistrationComponent } from './pages/registration/registration.component';
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
  ],
  providers: [ThemesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'final';

  constructor(private theme: ThemesService) {}

  ngOnInit(): void {
    this.theme.default();
  }
}
