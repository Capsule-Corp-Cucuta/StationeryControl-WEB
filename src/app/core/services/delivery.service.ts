import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Delivery } from '../models/delivery.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private endPoint = environment.APIUrl + 'delivery';

  constructor(private http: HttpClient) {}

  public create(delivery: Delivery) {
    return this.http.post<Delivery>(this.endPoint, delivery);
  }

  public findAll(page: number): Observable<any> {
    return this.http.get<Delivery[]>(this.endPoint + '/all/' + page);
  }

  public findByID(id: string) {
    return this.http.get(this.endPoint + '/' + id);
  }
}
