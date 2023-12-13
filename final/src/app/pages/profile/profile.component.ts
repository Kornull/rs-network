import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoggedActions, selectCheckProfileInfo } from '../../core/store/redux';
import { ProfileInfoType } from '../../core/store/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  providers: [NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userProfileInfo$!: Observable<ProfileInfoType | null>;

  name: string = '';

  email: string = '';

  createAt: string = '';

  uid: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userProfileInfo$ = this.store.select(selectCheckProfileInfo).pipe(
      map(info => {
        if (info === null) {
          this.store.dispatch(LoggedActions.getUserInfo());
          return null;
        }
        return info;
      })
    );
    this.userProfileInfo$.subscribe(res => {
      if (res !== null) {
        this.name = res.name;
        this.email = res.email;
        this.uid = res.uid;
        this.createAt = res.createdAt;
      }
    });
  }
}
