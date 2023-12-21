import { Component, Input, OnInit } from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ConversationActions } from '../../../../core/store/redux';
import {
  GroupMessagesDataType,
  UserRegisterData,
} from '../../../../core/store/models';
import LocalStorageService from '../../../../core/services/local-storage/local-storage.service';
import RequestsService from '../../../../core/services/requests/requests.service';
import SnackBarService from '../../../../core/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-conversation-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
  templateUrl: './conversation-form.component.html',
  styleUrl: './conversation-form.component.scss',
})
export class ConversationFormComponent implements OnInit {
  @Input() userId!: string;

  @Input() lastTimeSent!: string;

  @Input() messages: GroupMessagesDataType[] = [];

  messageForm!: FormGroup;

  localData!: UserRegisterData | null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private localStore: LocalStorageService,
    private request: RequestsService,
    private toast: SnackBarService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message: ['', [Validators.minLength(1), Validators.required]],
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.request
        .sendPersonalMessage(
          this.messageForm.controls['message'].value,
          this.userId
        )
        .pipe(
          map(() => {
            this.toast.openSnack('Message sent', false);
            this.store.dispatch(
              ConversationActions.getUserMessages({
                dialog: {
                  userId: this.userId,
                  since: this.messages.length
                    ? this.messages[this.messages.length - 1].time
                    : '',
                },
              })
            );
          }),
          catchError(err => {
            const { error } = err;
            if (error === null) {
              this.toast.openSnack(err.statusText, true);
            } else {
              this.toast.openSnack(error.message, true);
            }
            return EMPTY;
          })
        )
        .subscribe();
      this.messageForm.reset();
    }
  }
}
