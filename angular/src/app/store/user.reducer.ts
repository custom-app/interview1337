import {createReducer, on} from '@ngrx/store';
import {User} from '../user';
import {updateUserRequest} from './user.actions';


export const userFeatureKey = 'user';

export type State = User

export const initialState: State = {
  name: '',
  balance: 0,
  items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
}
export const reducer = createReducer<State>(
  initialState,
  on(updateUserRequest, (state, {data}) => data)
);
