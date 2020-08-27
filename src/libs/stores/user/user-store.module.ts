import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromUser from '@sq/libs/stores/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@sq/libs/stores/user/user.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    StoreModule.forFeature(fromUser.userFeatureName, fromUser.userReducer),
    EffectsModule.forFeature([UserEffects]),
    MatSnackBarModule,
    RouterModule,
  ],
})
export class UserStoreModule {}
