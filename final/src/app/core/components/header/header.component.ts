import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../services';
import { selectIsUserLogged } from '../../store/redux';
import { AppTheme } from '../../store/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;

  @Output() themeNow: EventEmitter<string> = new EventEmitter<string>();

  appTheme: string;

  constructor(
    private theme: LocalStorageService,
    private store: Store,
    private router: Router
  ) {
    this.appTheme = this.theme.getThemeApp() || 'lightThem';
  }

  ngOnInit(): void {
    this.store
      .select(selectIsUserLogged)
      .pipe(data => data)
      .subscribe(res => (this.isUserLogged = res));

    this.installTheme();
  }

  onSwitchTheme() {
    this.appTheme =
      this.appTheme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT;
    this.themeNow.emit(this.appTheme);
    this.theme.setThemeApp(this.appTheme);
  }

  onRunToProfile() {
    this.router.navigate(['/profile']);
  }

  installTheme() {
    this.themeNow.emit(this.appTheme);
  }
}
