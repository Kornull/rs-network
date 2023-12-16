import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { createGroupValidator } from '../../../../../shared/validators/create-group.validator';
import { LoggedActions } from '../../../../../core/store/redux';

export type ModalData = {
  groupTitle: string;
};

@Component({
  selector: 'app-modal',
  templateUrl: './groups-form.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  styleUrl: './groups-form.component.scss',
})
export class GroupsFormComponent implements OnInit {
  createGroup!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createGroup = this.fb.group({
      title: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.required,
          createGroupValidator(),
        ],
      ],
    });
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.onNoClick();
    this.store.dispatch(
      LoggedActions.setOwnGroup({
        titleGroup: this.createGroup.controls['title'].value,
      })
    );
  }
}
