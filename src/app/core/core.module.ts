import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { DeliveryService } from './services/delivery.service';
import { StatisticsService } from './services/statistics.service';
import { CertificateService } from './services/certificate.service';
import { InstitutionService } from './services/institution.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserService,
    CertificateService,
    DeliveryService,
    StatisticsService,
    AuthService,
    TokenService,
    InstitutionService,
  ],
})
export class CoreModule {}
