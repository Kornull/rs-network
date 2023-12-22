import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, Subscription, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  LoggedActions,
  selectCheckProfileInfo,
  selectIsUserLogged,
} from '../../../../core/store/redux';

import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ProfileLogoutBtnComponent } from '../profile-logout-btn/profile-logout-btn.component';

import { ProfileInfoType } from '../../../../core/store/models';
import { LoaderComponent } from '../../../../shared';
import RequestsService from '../../../../core/services/requests/requests.service';
import SnackBarService from '../../../../core/services/snack-bar/snack-bar.service';
import ClearStoreService from '../../../../core/services/clear-store/clear.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ProfileFormComponent,
    ProfileLogoutBtnComponent,
    LoaderComponent,
  ],
  providers: [NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userProfileInfo$!: Observable<ProfileInfoType | null>;

  private userProfileInfoSubscribe$!: Subscription;

  newName: string = '';

  validForm: boolean = false;

  isUpdateProfile: boolean = false;

  saveChanges: boolean = false;

  reset: boolean = false;

  name: string = '';

  email: string = '';

  createAt: string = '';

  uid: string = '';

  isUserLogged$!: Subscription;

  isUserLogged: boolean = false;

  constructor(
    private store: Store,
    private requestService: RequestsService,
    private toast: SnackBarService,
    private clear: ClearStoreService
  ) {}

  ngOnInit(): void {
    this.isUserLogged$ = this.store
      .select(selectIsUserLogged)
      .pipe(tap(res => (this.isUserLogged = res)))
      .subscribe();

    this.userProfileInfo$ = this.store.select(selectCheckProfileInfo).pipe(
      map(info => {
        if (info === null && this.isUserLogged) {
          this.store.dispatch(LoggedActions.getUserInfo());
          return null;
        }
        return info;
      })
    );
    this.userProfileInfoSubscribe$ = this.userProfileInfo$.subscribe(res => {
      if (res !== null) {
        this.name = res.name;
        this.email = res.email;
        this.uid = res.uid;
        this.createAt = res.createdAt;
      }
    });
  }

  ngOnDestroy(): void {
    this.userProfileInfoSubscribe$.unsubscribe();
  }

  onChangeUserInfo() {
    this.isUpdateProfile = true;
  }

  onCloseInput() {
    this.isUpdateProfile = false;
    this.validForm = false;
  }

  onSaveChanges() {
    if (this.validForm) {
      this.requestService.setUserName(this.newName).subscribe({
        next: () => {
          this.toast.openSnack('Name updated successfully', false);
          this.store.dispatch(
            LoggedActions.changeProfileName({ name: this.newName })
          );
          this.name = this.newName;
          this.isUpdateProfile = false;

          this.reset = false;
        },
        error: err => {
          const { error } = err;
          if (error.type === 'error') {
            this.toast.openSnack(err.message, true);
          } else {
            if (error.message.includes('was not')) {
              this.clear.clearUserStorage();
            }
            this.toast.openSnack(error.message, true);
          }
          this.validForm = true;
          this.reset = false;
        },
      });
    }
    this.validForm = false;
    this.reset = true;
  }
}
