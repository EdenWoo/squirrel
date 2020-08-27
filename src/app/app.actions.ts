import { Action } from '@ngrx/store';

export enum AppActionTypes {
  Loading = '[App] set loading',
}

export class SetSidebarMode implements Action {
  readonly type = AppActionTypes.Loading;

  constructor(public payload: boolean) {}
}

export type AppActions = SetSidebarMode;
