import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/shared/constants/global-constants';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';
import { InstitutionFormComponent } from './components/institution-form/institution-form.component';

const routes: Routes = [
  {
    path: Constants.ROUTES.LIST,
    component: InstitutionListComponent,
  },
  {
    path: Constants.ROUTES.CREATE,
    component: InstitutionFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {}
