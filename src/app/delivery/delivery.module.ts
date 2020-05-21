import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';

@NgModule({
  declarations: [DeliveryFormComponent, DeliveryListComponent],
  imports: [CommonModule, DeliveryRoutingModule, ReactiveFormsModule, SharedModule, MaterialModule],
})
export class DeliveryModule {}
