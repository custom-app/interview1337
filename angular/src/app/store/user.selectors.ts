import {createFeatureSelector} from '@ngrx/store';
import {State, userFeatureKey} from './user.reducer';

export const selectUser = createFeatureSelector<State>(userFeatureKey)
