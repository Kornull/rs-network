import { Injectable, isDevMode } from '@angular/core';

enum LogLevel {
  DEV = '[DEV]: App is running in the development mode',
  PROD = '[PROD]: App is running in the production mode',
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public isWorkspaceRun() {
    if (isDevMode()) {
      LoggerService.writeToLog(LogLevel.DEV);
    } else {
      LoggerService.writeToLog(LogLevel.PROD);
    }
  }

  private static writeToLog(level: LogLevel) {
    console.warn(LoggerService.getLogDate(), level);
  }

  private static getLogDate(): string {
    const date = new Date();
    return `[${date.getUTCFullYear()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getMilliseconds()}]`;
  }
}
