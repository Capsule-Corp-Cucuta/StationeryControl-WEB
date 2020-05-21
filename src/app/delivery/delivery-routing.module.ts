import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';

const routes: Routes = [
  {
    path: 'registrar',
    component: DeliveryFormComponent,
  },
  {
    path: 'lista',
    component: DeliveryListComponent,
  },
  {
    path: 'editar/:tradeNumber',
    component: DeliveryFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule {}
