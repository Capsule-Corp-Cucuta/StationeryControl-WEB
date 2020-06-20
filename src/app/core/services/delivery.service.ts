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

  public findByAttendant(attendant: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/attendant/' + attendant + '/' + page);
  }

  public findByTradeNumber(tradeNumber: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.endPoint + '/' + tradeNumber);
  }

  public findByDate(dateDelivery: Date, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/date/' + page + '?date=' + dateDelivery);
  }
  public findByBetweenDate(startDate: Date, endDate: Date, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(
      this.endPoint + '/between-dates/' + page + '?startDate=' + startDate + '&endDate=' + endDate
    );
  }

  public findByType(type: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/type/' + type + '/' + page);
  }

  public findByTypeUser(type: string, user: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/type/' + type + '/user/' + user + '/' + page);
  }

  public findByUser(user: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/user/' + user + '/' + page);
  }
}
