import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [SharedModule, CommonModule, MaterialModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
