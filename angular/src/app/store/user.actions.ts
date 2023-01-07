import {createAction, props} from '@ngrx/store';
import {User} from '../user';

export const updateUserRequest = createAction(
  '[User] update user request',
  props<{data: User}>(),
)
