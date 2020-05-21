import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserTypePipe } from './pipes/user-type.pipe';
import { MaterialModule } from '../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { CertificateTypePipe } from './pipes/certificate-type.pipe';
import { CertificateStatePipe } from './pipes/certificate-state.pipe';
import { UrlsPipe } from './pipes/urls.pipe';
import { DeliveryTypePipe } from './pipes/delivery-type.pipe';

@NgModule({
  declarations: [UserTypePipe, NavComponent, CertificateTypePipe, CertificateStatePipe, UrlsPipe, DeliveryTypePipe],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  exports: [UserTypePipe, CertificateTypePipe, CertificateStatePipe, UrlsPipe, DeliveryTypePipe],
})
export class SharedModule {}
