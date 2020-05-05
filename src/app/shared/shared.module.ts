import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserTypePipe } from './pipes/user-type.pipe';
import { MaterialModule } from '../material/material.module';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [UserTypePipe, NavComponent],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  exports: [UserTypePipe],
})
export class SharedModule {}
