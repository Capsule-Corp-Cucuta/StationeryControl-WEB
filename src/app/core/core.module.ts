import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './services/user.service';
import { DeliveryService } from './services/delivery.service';
import { StatisticsService } from './services/statistics.service';
import { CertificateService } from './services/certificate.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserService, CertificateService, DeliveryService, StatisticsService],
})
export class CoreModule {}
