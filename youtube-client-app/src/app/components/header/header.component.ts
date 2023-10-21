import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isViewFilter!: boolean;

  @Output() isViewSearchResults = new EventEmitter<boolean>();

  onViewResults(ev: boolean) {
    this.isViewSearchResults.emit(ev);
  }
}
