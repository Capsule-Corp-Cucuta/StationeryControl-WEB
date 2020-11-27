import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;

  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly LABELS = Constants.LABELS.CHANGE_PASSWORD;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: FacadeService) {
    this.buildForm();
  }

  ngOnInit(): void {}

  public changePassword(): void {
    if (this.validatePassword()) {
      this.service
        .changePassword(this.getId(), this.getFormValue('oldPassword'), this.getFormValue('newPassword'))
        .subscribe(
          (response) => {
            // TODO Message
            this.router.navigate(['/']);
          },
          (error) => {
            // TODO Message
          }
        );
    } else {
      // TODO Message
    }
  }

  public goToDashboard() {
    this.router.navigate([this.ROUTES.PRINCIPAL]);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      oldPassword: [undefined, [Validators.required]],
      newPassword: [undefined, [Validators.required]],
      repeatPassword: [undefined, [Validators.required]],
    });
  }

  private validatePassword(): boolean {
    if (
      this.getFormValue('newPassword') &&
      this.getFormValue('repeatPassword') &&
      this.getFormValue('newPassword') === this.getFormValue('repeatPassword')
    ) {
      return true;
    }
    return false;
  }

  private getId(): string {
    return this.service.getUser();
  }

  private getFormValue(control: string): string {
    if (this.form.controls[control].value) {
      return this.form.controls[control].value;
    } else {
      // TODO Message
      return undefined;
    }
  }
}
