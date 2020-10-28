import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TownshipService {
  private endPoint = environment.APIUrl + 'township';

  constructor(private http: HttpClient) {}

  public findAll(): Observable<string[]> {
    return this.http.get<string[]>(this.endPoint + '/all');
  }

  public findByName(name: string): Observable<string[]> {
    return this.http.get<string[]>(this.endPoint + '/name/' + name);
  }
}
