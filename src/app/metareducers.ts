import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import merge from 'lodash/merge';

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (state: any, rehydratedState: any, action: any) => {
  if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && rehydratedState) {
    state = merge(state, rehydratedState);
  }
  return state;
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['users'],
    rehydrate: true,
    mergeReducer,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
