import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  public form: FormGroup;

  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly LABELS = Constants.LABELS.RECOVER_PASSWORD;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: FacadeService) {
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
      this.service.recoverPassword(this.form.controls['user'].value).subscribe(
        (response) => {
          Swal.fire(
            'Exito!',
            'Se ha enviado la nueva contraseña al correo registrado para este numero de cedulas',
            'success'
          );
          this.redirect();
        },
        (error) => {
          Swal.fire(
            'Oops...!',
            'Error al enviar correo con contraseña, intenta mas tarde',
            'error'
          );
          this.redirect();
        }
      );
    } else {
      Swal.fire(
        'Oops...!',
        'Por favor, ingresa numero de cedula',
        'error'
      );
    }
  }

  private redirect(): void {
    // TODO Message
    this.router.navigate(['/']);
  }
}
