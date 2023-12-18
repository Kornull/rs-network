import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, exhaustMap, forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ConversationActions } from './action-types';
import {
  LocalStorageService,
  RequestsService,
  SnackBarService,
} from '../../services';
import { UserRegisterData } from '../models';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private request: RequestsService,
    private localStore: LocalStorageService,
    private store: Store,
    private router: Router,
    public modal: MatDialog
  ) {}
}
