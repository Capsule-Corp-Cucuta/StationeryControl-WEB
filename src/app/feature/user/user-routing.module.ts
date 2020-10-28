import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Constants } from '../../shared/constants/global-constants';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: Constants.ROUTES.LIST,
    component: UserListComponent,
  },
  {
    path: Constants.ROUTES.CREATE,
    component: UserFormComponent,
  },
  {
    path: Constants.ROUTES.UPDATE + '/:id',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
