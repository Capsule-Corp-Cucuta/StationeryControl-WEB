import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UrlsPipe } from './pipes/urls.pipe';
import { UserTypePipe } from './pipes/user-type.pipe';
import { MaterialModule } from './material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { DeliveryTypePipe } from './pipes/delivery-type.pipe';
import { CertificateTypePipe } from './pipes/certificate-type.pipe';
import { CertificateStatePipe } from './pipes/certificate-state.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DeliverysFilterComponent } from './components/deliverys-filter/deliverys-filter.component';
import { CertificatesFilterComponent } from './components/certificates-filter/certificates-filter.component';
import { UserNamePipe } from './pipes/user-name.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

@NgModule({
  declarations: [
    UserTypePipe,
    NavComponent,
    CertificateTypePipe,
    CertificateStatePipe,
    UrlsPipe,
    DeliveryTypePipe,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    CertificatesFilterComponent,
    DeliverysFilterComponent,
    UserNamePipe,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [
    UserTypePipe,
    CertificateTypePipe,
    CertificateStatePipe,
    UrlsPipe,
    DeliveryTypePipe,
    UserNamePipe,
    CertificatesFilterComponent,
    DeliverysFilterComponent,
  ],
})
export class SharedModule {}
