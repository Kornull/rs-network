import { Component } from '@angular/core';

import { DialogPageKey } from '../../../core/store/models';
import { ConversationComponent, LoaderComponent } from '../../../shared';

@Component({
  selector: 'app-personal-dialog',
  standalone: true,
  imports: [ConversationComponent, LoaderComponent],
  templateUrl: './personal-dialog.component.html',
  styleUrl: './personal-dialog.component.scss',
})
export class PersonalDialogComponent {
  conversationKey: string;

  isGroup: boolean = false;

  isGroupOpen: boolean = false;

  isConversationOpen: boolean = true;

  constructor() {
    this.conversationKey = DialogPageKey.PERSONAL;
  }
}
