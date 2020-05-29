import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { DashboardComponent } from './feature/dashboard/component/dashboard.component';
import { CertificateStatePipe } from './shared/pipes/certificate-state.pipe';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    CoreModule,
    FormsModule,
    SharedModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [CertificateStatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
