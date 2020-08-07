import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DeliveryType } from '../../../../core/models/delivery.model';
import { Constants } from '../../../../shared/constants/global-constants';
import { DeliveryService } from '../../../../core/services/delivery.service';
import { TokenService } from 'src/app/core/services/token.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss'],
})
export class DeliveryFormComponent implements OnInit {
  public form: FormGroup;
  public user: string;
  public receiver: string;
  public ICONS = Constants.ICONS;
  public LABELS = Constants.LABELS.DELIVERY.FORM;
  public TYPES = Constants.DELIVERIES_TYPES_MAPPER;
  public users: any[];

  constructor(
    private formBuilder: FormBuilder,
    private deliveryService: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private sessionService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.buildForm();
  }

  public buildForm() {
    this.form = this.formBuilder.group({
      tradeNumber: ['', [Validators.required]],
      firstCertificate: ['', [Validators.required]],
      lastCertificate: ['', [Validators.required]],
      sender: [this.user],
      receiver: [this.receiver],
      deliveryType: [DeliveryType.DEPARTURE, [Validators.required]],
    });
  }

  public create(e: Event) {
    e.preventDefault();
    console.log(this.form);
    this.form.value.receiver = this.receiver;
    if (this.form.valid) {
      console.log(this.form.value);
      const delivery = this.form.value;
      this.deliveryService.create(delivery).subscribe(
        (resp) => {
          // TODO
          this._snackBar.open('Registros asignados', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./entrega-devolucion/lista']);
        },
        (err) => {
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
          } else if (err.status === 404) {
            this._snackBar.open('Error al asignar los certificados', 'ERROR', {
              duration: 2000,
            });
          }
        }
      );
    }
  }

  public displayFn = (user) => {
    this.setIdentificationCard(user);
    return user && user.name ? user.name : '';
  };

  private setIdentificationCard(user: User) {
    if (user && user.identificationCard) {
      this.receiver = user.identificationCard;
    }
  }

  public findUserByName(e) {
    console.log(e);
    if (e != '') {
      this.userService.findByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }
}
