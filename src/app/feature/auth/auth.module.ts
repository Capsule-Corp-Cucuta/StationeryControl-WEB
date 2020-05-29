import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../../shared/material/material.module';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [LoginComponent, RecoverPasswordComponent, ChangePasswordComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule],
})
export class AuthModule {}
