import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserLogin } from '../../../../core/models/login.model';
import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public error = false;
  public isLogged = false;
  public isLoginFail = false;
  public roles: string[] = [];
  public form: FormGroup;
  public user: UserLogin;

  public readonly URIS = Constants.ROUTES;
  public readonly ICONS = Constants.ICONS;
  public readonly LINKS = Constants.LINKS;
  public readonly LABELS = Constants.LABELS.LOGIN;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: FacadeService) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.service.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.service.getAuthorities();
    }
  }

  public onLogin(): void {
    this.error = false;
    this.user = new UserLogin(this.form.controls['user'].value, this.form.controls['password'].value);

    this.service.login(this.user).subscribe(
      (response) => {
        this.service.setToken(response.token);
        this.service.setUser(response.identificationCard);
        this.service.setAuthorities(response.authorities);

        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.service.getAuthorities();
        this.router.navigate([this.URIS.PRINCIPAL]);
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.error = true;
      }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
