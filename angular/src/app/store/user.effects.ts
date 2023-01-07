import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {updateUserRequest} from './user.actions';
import {EMPTY, mergeMap} from 'rxjs';



@Injectable()
export class UserEffects {


  constructor(private actions$: Actions) {}

  updateUserRequest$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserRequest),
    mergeMap(() => {
      // ... выполнение запроса
      return EMPTY;
    })
  ), {dispatch: false})
}
