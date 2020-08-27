import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '@sq/libs/stores/interfaces/user';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const userFeatureName = 'users';

export interface UserState extends EntityState<User> {
  processing: boolean;
}

export const adapter = createEntityAdapter<User>({
  selectId: (u) => u.id,
});

export const initialState: UserState = adapter.getInitialState({
  processing: false,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.addUser, (state) => ({ ...state, processing: true })),
  on(UserActions.addUserSuccessful, (state, action) => adapter.upsertOne(action.user, state)),
);

export const selectUserFeature = createFeatureSelector<UserState>(userFeatureName);

export const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors(selectUserFeature);

export const selectProcessing = createSelector(selectUserFeature, (state) => state.processing);

export function userReducer(state: UserState | undefined, action: Action): UserState {
  return reducer(state, action);
}
