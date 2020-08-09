import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UrlsPipe } from './pipes/urls.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import { UserTypePipe } from './pipes/user-type.pipe';
import { MaterialModule } from './material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { DeliveryTypePipe } from './pipes/delivery-type.pipe';
import { CertificateTypePipe } from './pipes/certificate-type.pipe';
import { CertificateStatePipe } from './pipes/certificate-state.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { DeliverysFilterComponent } from './components/deliverys-filter/deliverys-filter.component';
import { CertificatesFilterComponent } from './components/certificates-filter/certificates-filter.component';

@NgModule({
  declarations: [
    UrlsPipe,
    UserTypePipe,
    NavComponent,
    UserNamePipe,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    DeliveryTypePipe,
    NotFoundComponent,
    CertificateTypePipe,
    ServerErrorComponent,
    CertificateStatePipe,
    DeliverysFilterComponent,
    CertificatesFilterComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [
    UrlsPipe,
    UserTypePipe,
    NavComponent,
    UserNamePipe,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    DeliveryTypePipe,
    NotFoundComponent,
    CertificateTypePipe,
    ServerErrorComponent,
    CertificateStatePipe,
    DeliverysFilterComponent,
    CertificatesFilterComponent,
  ],
})
export class SharedModule {}
