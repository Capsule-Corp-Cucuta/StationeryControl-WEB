import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserType } from '../../../../core/models/user.model';
import { Constants } from '../../../../shared/constants/global-constants';
import { FacadeService } from 'src/app/core/services/facade.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public isCreate: boolean;

  public readonly ICONS = Constants.ICONS;
  public readonly LABELS = Constants.LABELS.USER.FORM;
  public readonly USER_TYPES = Constants.USER_TYPES_MAPPER;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private service: FacadeService,
    private activeRoute: ActivatedRoute
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
          // TODO Message
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          if (err.status === 404) {
            // TODO Message
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
          // TODO Message
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          // TODO Message
          if (err.status === 404) {
            // TODO Message
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
          // TODO Message
          this.router.navigate(['./usuario/lista']);
        },
        (err) => {
          if (err.status === 404) {
            // TODO Message
          } else {
            this.handlerError(err);
          }
        }
      );
    }
  }

  public handlerError(err): void {
    if (err.status === 400) {
      // TODO Message
    } else if (err.status === 401) {
      // TODO Message
    } else if (err.status === 403) {
      // TODO Message
    }
  }
}
