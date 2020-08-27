import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/main/main.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'user',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
