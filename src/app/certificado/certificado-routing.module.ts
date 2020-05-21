import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadoFormComponent } from './components/certificado-form/certificado-form.component';
import { CertificadoListComponent } from './components/certificado-list/certificado-list.component';

const routes: Routes = [
  {
    path: 'registrar',
    component: CertificadoFormComponent,
  },
  {
    path: 'lista',
    component: CertificadoListComponent,
  },
  {
    path: 'editar/:number',
    component: CertificadoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificadoRoutingModule {}
