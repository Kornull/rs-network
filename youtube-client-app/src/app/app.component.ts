import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { init } from './core/store/redux/video.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'youtube-client-app';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(init());
  }
}
