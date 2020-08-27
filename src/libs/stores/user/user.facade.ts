import { Injectable } from '@angular/core';
import * as fromUser from '@sq/libs/stores/user/user.reducer';
import { select, Store } from '@ngrx/store';
import { User } from '@sq/libs/stores/interfaces/user';
import { addUser } from '@sq/libs/stores/user/user.actions';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  users$ = this.store.pipe(select(fromUser.selectAll));

  constructor(private store: Store<fromUser.UserState>) {}

  addUser(user: User) {
    this.store.dispatch(addUser({ user }));
  }
}
