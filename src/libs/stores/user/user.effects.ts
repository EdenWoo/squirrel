import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { addUser, addUserSuccessful } from '@sq/libs/stores/user/user.actions';
import { UserService } from '@sq/libs/stores/user/user.service';
import { NotifyService } from '@sq/app/shared/services/notify.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap((action) =>
        this.userService.addUser(action.user).pipe(
          map((response) => {
            this.notify.success('Successfully add user');
            this.router.navigate(['/user/list']);
            return addUserSuccessful({ user: response });
          }),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService, private notify: NotifyService, private router: Router) {}
}
