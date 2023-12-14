import { Component, Input, OnInit, Output } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { nameValidator } from '../../../shared';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent implements OnInit {
  updateForm!: FormGroup;

  @Output() newName!: string;

  @Input() oldName!: string;

  nameNow: string = this.oldName;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [
        this.oldName,
        [
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.required,
          nameValidator(),
        ],
      ],
    });
  }
}
