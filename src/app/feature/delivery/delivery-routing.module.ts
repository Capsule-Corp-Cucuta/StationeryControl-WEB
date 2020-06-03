import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Constants } from '../../shared/constants/global-constants';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';

const routes: Routes = [
  {
    path: Constants.ROUTES.LIST,
    component: DeliveryListComponent,
  },
  {
    path: Constants.ROUTES.CREATE,
    component: DeliveryFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule {}
