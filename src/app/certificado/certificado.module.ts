import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CertificadoRoutingModule } from './certificado-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CertificadoFormComponent } from './components/certificado-form/certificado-form.component';
import { CertificadoListComponent } from './components/certificado-list/certificado-list.component';
import { CertificadoModalComponent } from './components/certificado-modal/certificado-modal.component';

@NgModule({
  declarations: [CertificadoFormComponent, CertificadoListComponent, CertificadoModalComponent],
  imports: [CommonModule, CertificadoRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule],
})
export class CertificadoModule {}
