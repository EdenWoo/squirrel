import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextMaskModule } from 'angular2-text-mask';
import { UserStoreModule } from '@sq/libs/stores/user/user-store.module';
import { UsersComponent } from '@sq/app/pages/user/users/users.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [UserComponent, UsersComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MatPasswordStrengthModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    UserStoreModule,
    MatPaginatorModule,
  ],
})
export class UserModule {}
