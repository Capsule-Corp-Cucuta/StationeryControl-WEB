import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/shared/constants/global-constants';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';

const routes: Routes = [
  {
    path: Constants.ROUTES.LIST,
    component: InstitutionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {}
