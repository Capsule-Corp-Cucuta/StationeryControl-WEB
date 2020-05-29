import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}
  private buildForm() {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
    });
  }
}
