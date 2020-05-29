import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Delivery } from '../models/delivery.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private endPoint = environment.APIUrl + 'delivery';

  constructor(private http: HttpClient) {}

  public create(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.endPoint, delivery);
  }

  public findAll(page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/all/' + page);
  }

  public findByID(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(this.endPoint + '/' + id);
  }
}
