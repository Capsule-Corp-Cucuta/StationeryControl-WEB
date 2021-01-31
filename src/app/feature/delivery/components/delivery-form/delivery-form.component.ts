import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user.model';
import { DeliveryType, Delivery } from '../../../../core/models/delivery.model';
import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['../../../../shared/styles/form.component.scss'],
})
export class DeliveryFormComponent implements OnInit {
  public delivery: Delivery;
  public user: string;
  public receiver: string;
  public users: any[];
  public form: FormGroup;

  public readonly ICONS = Constants.ICONS;
  public readonly LABELS = Constants.LABELS.DELIVERY.FORM;
  public readonly TYPES = Constants.DELIVERIES_TYPES_MAPPER;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private service: FacadeService
  ) {  }

  ngOnInit(): void {
    this.user = this.service.getUser();
    this.buildForm();
    
  }

  private buildForm() {
    this.form = this.builder.group({
      tradeNumber:['', [Validators.required]],
      deliveryType:[DeliveryType.DEPARTURE,[Validators.required]],
      firstCertificate: ['', [Validators.required]],
      lastCertificate: ['', [Validators.required]],
      sender: this.user,
      receiver: ['', [Validators.required]],
    });
  }

  public create(e: Event) {
     e.preventDefault();
     if (this.form.valid) {
     const delivery = this.form.value;
     delivery.receiver = this.receiver;
    this.service.createDelivery(delivery).subscribe(() => {
      Swal.fire(
        'Exito!',
        'entrega y/o devolucion Registrada.',
        'success'
      );
      this.router.navigate(['./entrega-devolucion/lista']);
    },(err)=>{
      this.handlerError(err);
    });
   }
  }

  public displayFn = (user) => {
    this.setId(user);
    return user && user.name ? user.name : '';
  }

  private setId(user: User) {
    if (user && user.id) {
      this.receiver = user.id;
    }
  }

  public findUserByName(e) {
    if (e !== '') {
      this.service.findUserByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }

  public handlerError(err): void {
    if (err.status === 404) {
        Swal.fire(
          'Oops...!',
          'Error al registrar entrega y/o devolucion.',
          'error'
        );
     } else if (err.status === 500) {
       Swal.fire(
         'ERROR 500 !',
         'INTERNAL, SERVER ERROR.',
         'error'
       );
       //this.router.navigate(['/server-error']);
     }else {
       Swal.fire(
         'Oops...!',
         'ah ocurrido un error, intenta mas tarde.',
         'error'
       );
     }
   }
}
