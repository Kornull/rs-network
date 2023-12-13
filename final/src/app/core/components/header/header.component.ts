import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemesService } from '../../services';
import { selectIsUserLogged } from '../../store/redux';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  providers: [ThemesService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;

  constructor(
    private theme: ThemesService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectIsUserLogged)
      .pipe(data => data)
      .subscribe(res => (this.isUserLogged = res));
  }

  onSwitchTheme() {
    this.theme.changeTheme();
  }

  onRunToProfile() {
    this.router.navigate(['/profile']);
  }
}
