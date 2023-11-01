import { Component, OnInit } from '@angular/core';
import { LoggerService } from './core/services/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'youtube-client-app';

  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loggerService.isWorkspaceRun();
  }
}
