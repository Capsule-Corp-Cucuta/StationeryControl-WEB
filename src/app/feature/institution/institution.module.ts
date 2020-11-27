import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InstitutionRoutingModule } from './institution-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';

@NgModule({
  declarations: [InstitutionListComponent],
  imports: [CommonModule, InstitutionRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule],
})
export class InstitutionModule {}
