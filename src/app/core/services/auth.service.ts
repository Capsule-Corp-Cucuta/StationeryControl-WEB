import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtModel } from '../models/JWT.model';
import { UserLogin } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endPoint = environment.APIUrl + 'auth';

  constructor(private http: HttpClient) {}

  public login(user: UserLogin): Observable<JwtModel> {
    return this.http.post<JwtModel>(this.endPoint, user);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
