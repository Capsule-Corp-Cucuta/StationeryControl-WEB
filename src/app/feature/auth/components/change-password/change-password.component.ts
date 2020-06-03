import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  public ICONS = Constants.ICONS;
  public LABELS = Constants.LABELS.CHANGE_PASSWORD;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  public buildForm(): void {
    this.form = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
    });
  }
}
