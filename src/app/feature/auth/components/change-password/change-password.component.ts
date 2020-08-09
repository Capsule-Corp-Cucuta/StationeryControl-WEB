import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Constants } from '../../../../shared/constants/global-constants';
import { UserService } from '../../../../core/services/user.service';
import { TokenService } from '../../../../core/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  public ICONS = Constants.ICONS;
  public LABELS = Constants.LABELS.CHANGE_PASSWORD;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sesionService: TokenService,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  public changePassword(): void {
    if (this.validatePassword()) {
      this.userService
        .changePassword(this.getId(), this.getFormValue('oldPassword'), this.getFormValue('newPassword'))
        .subscribe(
          (response) => {
            this._snackBar.open('La clave fue cambiada exitosamente', 'OK', {
              duration: 2000,
            });
            this.router.navigate(['/']);
          },
          (error) => {
            this._snackBar.open('Las claves no coinciden', 'OK', {
              duration: 2000,
            });
          }
        );
    } else {
      this._snackBar.open('Las claves no coinciden', 'OK', {
        duration: 2000,
      });
    }
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
    return this.sesionService.getUser();
  }

  private getFormValue(control: string): string {
    if (this.form.controls[control].value) {
      return this.form.controls[control].value;
    } else {
      this._snackBar.open('Todos los campos deben estar diligenciados', 'OK', {
        duration: 5000,
      });
      return undefined;
    }
  }
}
