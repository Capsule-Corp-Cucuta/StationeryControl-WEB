import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../../core/services/user.service';
import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  public form: FormGroup;
  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public LABELS = Constants.LABELS.RECOVER_PASSWORD;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      user: [undefined, [Validators.required]],
    });
  }

  public request(): void {
    if (this.form.controls['user'].value) {
      this.userService.recoverPassword(this.form.controls['user'].value).subscribe(
        (response) => {
          this.redirect();
        },
        (error) => {
          this.redirect();
        }
      );
    } else {
      this._snackBar.open('Los campos deben estar diligenciados', 'OK', {
        duration: 5000,
      });
    }
  }

  private redirect(): void {
    this._snackBar.open(
      'Se envió un correo electrónico con una contraseña temporal para que pueda ingresar al sistema.',
      'OK',
      {
        duration: 5000,
      }
    );
    this.router.navigate(['/']);
  }
}
