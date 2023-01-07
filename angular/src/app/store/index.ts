import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromUser from './user.reducer';


export interface AppState {

  [fromUser.userFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromUser.userFeatureKey]: fromUser.reducer,
};
