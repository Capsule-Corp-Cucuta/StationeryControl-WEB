import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../../core/models/user.model';
import { DeliveryType } from '../../../../core/models/delivery.model';
import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { DeliveryService } from '../../../../core/services/delivery.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss'],
})
export class DeliveryFormComponent implements OnInit {
  public user: string;
  public receiver: string;
  public users: any[];
  public form: FormGroup;

  public readonly ICONS = Constants.ICONS;
  public readonly LABELS = Constants.LABELS.DELIVERY.FORM;
  public readonly TYPES = Constants.DELIVERIES_TYPES_MAPPER;

  constructor(
    private formBuilder: FormBuilder,
    private deliveryService: DeliveryService,
    private router: Router,
    private service: FacadeService
  ) {}

  ngOnInit(): void {
    this.user = this.service.getUser();
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
    this.form.value.receiver = this.receiver;
    if (this.form.valid) {
      const delivery = this.form.value;
      this.deliveryService.create(delivery).subscribe(
        (resp) => {
          // TODO Message
          this.router.navigate(['./entrega-devolucion/lista']);
        },
        (err) => {
          if (err.status === 400) {
            // TODO Message
          } else if (err.status === 401) {
            // TODO Message
          } else if (err.status === 403) {
            // TODO Message
          } else if (err.status === 404) {
            // TODO Message
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
    if (e !== '') {
      this.service.findByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }
}
