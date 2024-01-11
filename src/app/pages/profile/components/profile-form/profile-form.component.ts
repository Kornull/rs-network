import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { nameValidator, sameNameValidator } from '../../../../shared';

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
export class ProfileFormComponent implements OnInit, OnChanges {
  updateForm!: FormGroup;

  @Output() newName: EventEmitter<string> = new EventEmitter<string>();

  @Output() validForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() oldName!: string;

  @Input() isSaveChanges!: boolean;

  @Input() disabledInput: boolean = false;

  nameNow: string = this.oldName;

  constructor(private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      name: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.required,
          nameValidator(),
          sameNameValidator(this.oldName),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.updateForm.controls['name'].setValue(this.oldName);
  }

  ngOnChanges(): void {
    if (this.disabledInput === true) {
      this.updateForm.controls['name'].disable();
    } else {
      this.updateForm.controls['name'].enable();
    }
  }

  onChange() {
    const name = this.updateForm.controls['name'].value;
    if (name === this.oldName) {
      this.updateForm.controls['name'].setErrors({ sameName: true });
    }
    this.newName.emit(this.updateForm.controls['name'].value);
    this.validForm.emit(this.updateForm.valid);
  }
}
