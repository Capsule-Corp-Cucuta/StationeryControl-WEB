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

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.endPoint + '/' + user.id, user);
  }

  public delete(id: string): Observable<Response> {
    return this.http.delete<Response>(this.endPoint + '/' + id);
  }

  public findByID(id: string): Observable<User> {
    return this.http.get<User>(this.endPoint + '/' + id);
  }

  public findAll(page: number): Observable<User[]> {
    return this.http.get<User[]>(this.endPoint + '/all/' + page);
  }

  public findByName(name: string, page: number): Observable<User[]> {
    return this.http.get<User[]>(this.endPoint + '/name/' + name + '/' + page);
  }

  public changePassword(id: string, oldPass: string, newPass: string): Observable<Response> {
    return this.http.post<Response>(`${this.endPoint}/${id}/change-password?oldPass=${oldPass}&newPass=${newPass}`, {});
  }

  public recoverPassword(id: string): Observable<Response> {
    return this.http.put<Response>(`${this.endPoint}/${id}/recover-password`, {});
  }

  public countUsers(): Observable<Response> {
    return this.http.get<Response>(`${this.endPoint}/count`);
  }
}
