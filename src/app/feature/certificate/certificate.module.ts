import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CertificadoRoutingModule } from './certificate-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { CertificateFormComponent } from './components/certificate-form/certificate-form.component';
import { CertificateListComponent } from './components/certificate-list/certificate-list.component';
import { CertificateModalComponent } from './components/certificate-modal/certificate-modal.component';

@NgModule({
  declarations: [CertificateFormComponent, CertificateListComponent, CertificateModalComponent],
  imports: [CommonModule, CertificadoRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule],
})
export class CertificadoModule {}
