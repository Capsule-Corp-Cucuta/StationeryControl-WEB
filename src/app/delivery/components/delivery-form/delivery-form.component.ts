import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryType } from '../../../core/models/delivery.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryService } from '../../../core/services/delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss'],
})
export class DeliveryFormComponent implements OnInit {
  public form: FormGroup;
  public types = ['DEPARTURE', 'REGRESS'];

  constructor(
    private formBuilder: FormBuilder,
    private deliveryService: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.form = this.formBuilder.group({
      tradeNumber: ['', [Validators.required]],
      firstCertificate: ['', [Validators.required]],
      lastCertificate: ['', [Validators.required]],
      sender: ['', [Validators.required]],
      receiver: ['', [Validators.required]],
      deliveryType: [DeliveryType.DEPARTURE, [Validators.required]],
    });
  }

  public create(e: Event) {
    e.preventDefault();
    //console.log(this.form.value);

    if (this.form.valid) {
      const delivery = this.form.value;
      this.deliveryService.create(delivery).subscribe(
        (resp) => {
          // TODO
          this._snackBar.open('Registros asignados', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./entrega/lista']);
        },
        (err) => {
          // TODO
          alert(err.error.message);
        }
      );
    }
  }
}
