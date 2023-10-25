import { Component,Input } from '@angular/core';

import { DefaultDataCustomBtn } from 'src/app/core/store/models/types';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() buttonStyle: string = DefaultDataCustomBtn.DEFAULT;

  @Input() disabled: boolean = false;
}
