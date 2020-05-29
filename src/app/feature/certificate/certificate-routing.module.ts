import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Constants } from '../../shared/constants/global-constants';
import { CertificateFormComponent } from './components/certificate-form/certificate-form.component';
import { CertificateListComponent } from './components/certificate-list/certificate-list.component';

const routes: Routes = [
  {
    path: Constants.ROUTES.LIST,
    component: CertificateListComponent,
  },
  {
    path: Constants.ROUTES.CREATE,
    component: CertificateFormComponent,
  },
  {
    path: Constants.ROUTES.UPDATE + '/:number',
    component: CertificateFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificadoRoutingModule {}
