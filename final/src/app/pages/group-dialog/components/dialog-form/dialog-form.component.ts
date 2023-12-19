import { Component, Input, OnInit } from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { Store } from '@ngrx/store';

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
import { LocalStorageService } from '../../../../core/services';
import { ConversationActions } from '../../../../core/store/redux';
import { UserRegisterData } from '../../../../core/store/models';

@Component({
  selector: 'app-dialog-form',
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
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss',
})
export class DialogFormComponent implements OnInit {
  @Input() groupId!: string;

  messageForm!: FormGroup;

  localData!: UserRegisterData | null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private localStore: LocalStorageService
  ) {
    this.localData = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message: ['', [Validators.minLength(1), Validators.required]],
    });
  }

  onSubmit() {
    const date = new Date();
    if (this.messageForm.valid) {
      this.store.dispatch(
        ConversationActions.sendGroupMessage({
          dialog: {
            userId: this.localData?.uid || '',
            createAt: `${date.getTime()}`,
            message: this.messageForm.controls['message'].value,
            groupId: this.groupId,
          },
        })
      );
      this.messageForm.reset();
    }
  }
}
