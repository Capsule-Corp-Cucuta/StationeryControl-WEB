import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Constants } from '../../../../shared/constants/global-constants';
import { UserLogin } from 'src/app/core/models/login.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public URIS = Constants.ROUTES;
  public ICONS = Constants.ICONS;
  public LINKS = Constants.LINKS;
  public LABELS = Constants.LABELS.LOGIN;

  public form: FormGroup;
  public user: UserLogin;
  public error = false;
  public isLogged = false;
  public isLoginFail = false;
  public roles: string[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  public onLogin(): void {
    this.error = false;
    this.user = new UserLogin(this.form.controls['user'].value, this.form.controls['password'].value);

    this.authService.login(this.user).subscribe(
      (response) => {
        this.tokenService.setToken(response.token);
        this.tokenService.setUser(response.identificationCard);
        this.tokenService.setAuthorities(response.authorities);

        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
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
