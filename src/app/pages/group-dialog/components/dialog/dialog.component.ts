import { Component } from '@angular/core';

import { DialogPageKey } from '../../../../core/store/models';
import { ConversationComponent, LoaderComponent } from '../../../../shared';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [ConversationComponent, LoaderComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  conversationKey: string;

  isGroup: boolean = true;

  isGroupOpen: boolean = true;

  isConversationOpen: boolean = false;

  constructor() {
    this.conversationKey = DialogPageKey.GROUP;
  }
}
