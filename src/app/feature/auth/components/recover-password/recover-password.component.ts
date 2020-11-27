import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';

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
          this.redirect();
        },
        (error) => {
          this.redirect();
        }
      );
    } else {
      // TODO Message
    }
  }

  private redirect(): void {
    // TODO Message
    this.router.navigate(['/']);
  }
}
