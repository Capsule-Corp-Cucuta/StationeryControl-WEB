import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endPoint = environment.APIUrl + 'user';

  constructor(private http: HttpClient) {}

  public create(user: User): Observable<User> {
    return this.http.post<User>(this.endPoint, user);
  }

  public findByID(id: string): Observable<User> {
    return this.http.get<User>(this.endPoint + '/' + id);
  }

  public findAll(page: number): Observable<User[]> {
    return this.http.get<User[]>(this.endPoint + '/all/' + page);
  }

  public findByUserName(name: string, page: number): Observable<User[]> {
    return this.http.get<User[]>(this.endPoint + '/name/' + name + '/' + page);
  }

  public update(id: string, user: User): Observable<User> {
    return this.http.put<User>(this.endPoint + '/' + id, user);
  }

  public delete(id: string): Observable<Response> {
    return this.http.delete<Response>(this.endPoint + '/' + id);
  }
}