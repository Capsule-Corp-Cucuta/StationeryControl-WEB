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

  public findByTradeNumber(tradeNumber: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.endPoint + '/' + tradeNumber);
  }

  public findAll(page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/all/' + page);
  }

  public findByAttendant(attendant: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/user/' + attendant + '/' + page);
  }

  public findByDate(date: Date, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/date/' + page + '?date=' + date);
  }
  public findByBetweenDate(startDate: Date, endDate: Date, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(
      this.endPoint + '/between-dates/' + page + '?startDate=' + startDate + '&endDate=' + endDate
    );
  }

  public findByType(type: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/type/' + type + '/' + page);
  }

  public findByTypeAndUser(type: string, user: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/type/' + type + '/user/' + user + '/' + page);
  }

  public findByUser(user: string, page: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.endPoint + '/user/' + user + '/' + page);
  }

  public countDeliveries(): Observable<Response> {
    return this.http.get<Response>(`${this.endPoint}/count`);
  }

  public countDeliveriesByAttendant(cedula: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/user/' + cedula);
  }
}
