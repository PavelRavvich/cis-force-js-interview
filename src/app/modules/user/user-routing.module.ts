import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children: [
      {
        path: ':id',
        component: UserComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
