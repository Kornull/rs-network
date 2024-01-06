import { Component } from '@angular/core';

import { DialogPageKey } from '../../../../core/store/models';
import { ConversationComponent } from '../../../../shared';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [ConversationComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  conversationKey: string;

  constructor() {
    this.conversationKey = DialogPageKey.GROUP;
  }
}
