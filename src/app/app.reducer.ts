import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppActions } from '@sq/app/app.actions';

// tslint:disable-next-line no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

// tslint:disable-next-line no-empty-interface
export interface AppState extends State {
  appState: string;
}

export const initialAppState: AppState = {
  appState: '',
};

export function appReducer(state = initialAppState, action: AppActions): AppState {
  switch (action.type) {
    default:
      return state;
  }
}

export const appFeatureName = 'app';

export const selectAppFeature = createFeatureSelector<AppState>(appFeatureName);
