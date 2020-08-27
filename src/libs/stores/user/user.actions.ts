import { createAction, props } from '@ngrx/store';
import { User } from '@sq/libs/stores/interfaces/user';

export const addUser = createAction('[User] Add User', props<{ user: User }>());

export const addUserSuccessful = createAction('[User] Add User Successful', props<{ user: User }>());
