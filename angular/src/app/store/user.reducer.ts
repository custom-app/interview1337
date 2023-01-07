import {createReducer, on} from '@ngrx/store';
import {User} from '../user';
import {updateUserRequest} from './user.actions';


export const userFeatureKey = 'user';

export type State = User

export const initialState: State = {
  name: '',
  balance: 0,
}
export const reducer = createReducer<State>(
  initialState,
  on(updateUserRequest, (state, {data}) => data)
);
