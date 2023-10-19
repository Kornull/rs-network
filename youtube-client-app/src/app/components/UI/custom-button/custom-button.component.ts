import { Component, Input } from '@angular/core';

import { DefaultDataCustomBtn } from 'src/app/models/default-data-custom-btn.model';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() buttonStyle: string = DefaultDataCustomBtn.DEFAULT;
}
