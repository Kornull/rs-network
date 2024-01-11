import { Component, Input, OnInit } from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { EMPTY, Subscription, catchError, interval, map, tap } from 'rxjs';

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
  DialogPageKey,
  GroupMessagesDataType,
  UserRegisterData,
} from '../../../../core/store/models';
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
  @Input() id!: string;

  @Input() dialogKey: string = '';

  @Input() lastTimeSent!: string;

  @Input() messages: GroupMessagesDataType[] = [];

  interval$!: Subscription;

  request$!: Subscription;

  messageForm!: FormGroup;

  localData!: UserRegisterData | null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
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
      if (this.dialogKey === DialogPageKey.PERSONAL) this.personalSubmit();
      if (this.dialogKey === DialogPageKey.GROUP) this.groupSubmit();
    }
  }

  personalSubmit() {
    this.request$ = this.request
      .sendPersonalMessage(this.messageForm.controls['message'].value, this.id)
      .pipe(
        tap(() => {
          this.updatePersonalMessage();
        }),
        catchError(err => {
          const { error } = err;
          if (error === null) {
            this.toast.openSnack(err.message, true);
          } else {
            this.toast.openSnack(error.message, true);
          }
          return EMPTY;
        })
      )
      .subscribe();
    this.messageForm.reset();
  }

  groupSubmit() {
    this.request$ = this.request
      .sendMessageToGroup(this.messageForm.controls['message'].value, this.id)
      .pipe(
        tap(() => {
          this.updateGroupMessage();
        }),
        catchError(err => {
          const { error } = err;
          if (error === null) {
            this.toast.openSnack(err.message, true);
          } else {
            this.toast.openSnack(error.message, true);
          }
          return EMPTY;
        })
      )
      .subscribe();
    this.messageForm.reset();
  }

  updateGroupMessage() {
    this.interval$ = interval(300)
      .pipe(
        map(() => {
          this.store.dispatch(
            ConversationActions.getGroupMessages({
              dialog: {
                groupId: this.id,
                since: this.messages.length
                  ? this.messages[this.messages.length - 1].time
                  : '',
              },
            })
          );
          this.removeInterval();
        })
      )
      .subscribe();
  }

  updatePersonalMessage() {
    this.interval$ = interval(300)
      .pipe(
        map(() => {
          this.store.dispatch(
            ConversationActions.getUserMessages({
              dialog: {
                userId: this.id,
                since: this.messages.length
                  ? this.messages[this.messages.length - 1].time
                  : '',
              },
            })
          );
          this.removeInterval();
        })
      )
      .subscribe();
  }

  removeInterval() {
    this.interval$.unsubscribe();
    this.request$.unsubscribe();
  }
}
