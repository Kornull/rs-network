import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { EMPTY, Observable, catchError, exhaustMap, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoggedActions, selectCheckProfileInfo } from '../../core/store/redux';

import { ProfileInfoType } from '../../core/store/models';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileDataService, SnackBarService } from '../../core/services';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ProfileFormComponent],
  providers: [NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userProfileInfo$!: Observable<ProfileInfoType | null>;

  newName: string = '';

  validForm: boolean = false;

  isUpdateProfile: boolean = false;

  saveChanges: boolean = false;

  reset: boolean = false;

  name: string = '';

  email: string = '';

  createAt: string = '';

  uid: string = '';

  constructor(
    private store: Store,
    private updateName: ProfileDataService,
    private toast: SnackBarService
  ) {}

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

  onChangeUserInfo() {
    this.isUpdateProfile = true;
  }

  onCloseInput() {
    this.isUpdateProfile = false;
  }

  onSaveChanges() {
    if (this.validForm) {
      this.updateName
        .setUserName(this.newName)
        .pipe(
          exhaustMap(() => {
            this.toast.openSnack('Name updated successfully', false);
            this.store.dispatch(
              LoggedActions.changeProfileName({ name: this.newName })
            );
            this.name = this.newName;
            this.isUpdateProfile = false;

            this.validForm = true;
            this.reset = false;

            return EMPTY;
          }),
          catchError(err => {
            const { error } = err;
            if (error === null) {
              this.toast.openSnack(err.statusText, true);
            } else {
              this.toast.openSnack(error.message, true);
            }
            this.validForm = true;
            this.reset = false;
            return EMPTY;
          })
        )
        .subscribe();
    }
    this.validForm = false;
    this.reset = true;
  }
}
