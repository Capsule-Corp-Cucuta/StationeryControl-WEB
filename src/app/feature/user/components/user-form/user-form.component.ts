import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserType } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public isCreate: boolean;

  public ICONS = Constants.ICONS;
  public LABELS = Constants.LABELS.USER.FORM;
  public USER_TYPES = Constants.USER_TYPES_MAPPER;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private service: UserService,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.validateIsCreateForm();
  }

  public validateIsCreateForm() {
    this.activeRoute.params.subscribe((params: Params) => {
      const identificationCard = params.identificationCard;
      if (identificationCard) {
        this.isCreate = false;
        this.service.findByID(identificationCard).subscribe((resp) => {
          this.form.patchValue(resp);
        });
      } else {
        this.isCreate = true;
      }
    });
  }

  private buildForm() {
    this.form = this.builder.group({
      identificationCard: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      userType: [UserType.ADMINISTRATOR, [Validators.required]],
    });
  }

  public create(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      const user = this.form.value;
      this.service.create(user).subscribe(
        (resp) => {
          this._snackBar.open('Registro Exitoso', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          if (err.status === 404) {
            this._snackBar.open('Usuario ya existe', 'ERROR', {
              duration: 2000,
            });
          } else {
            this.handlerError(err);
          }
        }
      );
    }
  }

  public update(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.service.update(user.identificationCard, user).subscribe(
        (resp) => {
          this._snackBar.open('Usuario Actualizado', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          if (err.status === 404) {
            this._snackBar.open('Usuario no encontrado', 'ERROR', {
              duration: 2000,
            });
          } else {
            this.handlerError(err);
          }
        }
      );
    }
  }

  public delete(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.service.delete(user.identificationCard).subscribe(
        (resp) => {
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          if (err.status === 404) {
            this._snackBar.open('El usuario no existe', 'OK', {
              duration: 2000,
            });
          } else {
            this.handlerError(err);
          }
        }
      );
    }
  }

  public handlerError(err): void {
    if (err.status === 400) {
      this._snackBar.open('Peticion erronea, Por favor modificarla', 'ERROR', {
        duration: 3000,
      });
    } else if (err.status === 401) {
      this._snackBar.open('Peticion carece de credenciales válidas de autenticación', 'ERROR', {
        duration: 3000,
      });
    } else if (err.status === 403) {
      this._snackBar.open('Peticion Prohibida', 'ERROR', {
        duration: 3000,
      });
    }
  }
}
