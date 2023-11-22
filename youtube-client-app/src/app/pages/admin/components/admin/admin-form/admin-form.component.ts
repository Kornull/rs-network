import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { dateValidator } from 'src/app/shared/validators';
import { CardsVideoActions } from 'src/app/core/store/redux';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  createCardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createCardForm = this.fb.group({
      info: this.fb.group({
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        imageLink: ['', [Validators.required]],
        videoLink: ['', [Validators.required]],
        date: ['', [Validators.required, dateValidator()]],
        description: ['', [Validators.maxLength(255)]],
      }),
      tags: this.fb.group({
        tagList: this.fb.array([this.fb.control(null, Validators.required)]),
      }),
    });
  }

  onAddTag() {
    const newTag = this.fb.control(null, Validators.required);
    (<FormArray>this.createCardForm.get('tags.tagList')).push(newTag);
  }

  getTags(): AbstractControl[] {
    const tagsArray = this.createCardForm.get('tags.tagList') as FormArray;
    return tagsArray.controls;
  }

  isTagsArrayFull(): boolean {
    const arr = this.createCardForm.get('tags.tagList') as FormArray;
    if (arr.controls.length < 5) return false;
    return true;
  }

  getValidity(i: number) {
    return (<FormArray>this.createCardForm.get('tags.tagList')).controls[i]
      .invalid;
  }

  onClearFormArray = () => {
    const tagsArray = <FormArray>this.createCardForm.get('tags.tagList');
    while (tagsArray.controls.length !== 1) {
      tagsArray.removeAt(0);
    }
  };

  onResetForm(): void {
    this.onClearFormArray();
    this.createCardForm.reset();
  }

  onSubmit(): void {
    const { info, tags } = this.createCardForm.value;
    this.store.dispatch(
      CardsVideoActions.addCustomCard({
        customCard: {
          key: `${Date.now()}`,
          value: {
            title: info.title,
            subTitle: tags.tagList.join(', '),
            imageLink: info.imageLink,
            videoLink: info.videoLink,
            date: info.date,
            description: info.description,
            tags: tags.tagList.join(', '),
            statistics: null,
          },
          liked: null,
          deleteBtn: true,
        },
      })
    );
    this.onResetForm();
    this.router.navigate(['./main']);
  }
}
