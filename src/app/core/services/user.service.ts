import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endPoint = environment.APIUrl + 'user';

  constructor(private http: HttpClient) {}

  public create(user: User) {
    return this.http.post<User>(this.endPoint, user);
  }

  public findByID(id: string) {
    return this.http.get(this.endPoint + '/' + id);
  }

  public findAll(page: number): Observable<any> {
    return this.http.get<User[]>(this.endPoint + '/all/' + page);
  }

  public findByUserName(name: string, page: number) {
    return this.http.get<User[]>(this.endPoint + '/name/' + name + '/' + page);
  }

  public update(id: string, user: User) {
    return this.http.put(this.endPoint + '/' + id, user);
  }

  public delete(id: string) {
    return this.http.delete(this.endPoint + '/' + id);
  }
}
