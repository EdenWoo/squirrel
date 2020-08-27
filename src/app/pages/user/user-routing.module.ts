import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from '@sq/app/pages/user/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add',
  },
  {
    path: 'add',
    component: UserComponent,
  },
  {
    path: 'list',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
