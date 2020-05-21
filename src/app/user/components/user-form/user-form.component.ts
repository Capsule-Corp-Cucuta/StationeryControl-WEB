import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserType, User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public isCreate: boolean;
  public types = ['ADMINISTRATOR', 'IDS', 'DANE', 'DEPARTMENTAL', 'MUNICIPAL', 'INSTITUTIONAL'];

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
          // TODO
          this._snackBar.open('Registro Exitoso', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          // TODO
          alert(err.error.message);
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
          // TODO
          this._snackBar.open('Usuario Actualizado', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          // TODO
          alert(err.error.message);
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
          // TODO
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          // TODO
          alert(err.error.message);
        }
      );
    }
  }
}
