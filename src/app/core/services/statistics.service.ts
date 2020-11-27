import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private endPoint = environment.APIUrl + 'certificate';

  constructor(private http: HttpClient) {}

  public countAll(): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/all');
  }

  public countByType(tipo: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/type/' + tipo);
  }

  public countByTypeAndAttendant(tipo: string, cedula: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/type/' + tipo + '/attendant/' + cedula);
  }

  public countByTypeAndInstitution(tipo: string, institucion: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/type/' + tipo + '/institution/' + institucion);
  }

  public countByState(estado: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/state/' + estado);
  }

  public countByStateAndAttendant(estado: string, cedula: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/state/' + estado + '/attendant/' + cedula);
  }

  public countByStateAndInstitution(estado: string, institucion: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/state/' + estado + '/institution/' + institucion);
  }

  public countByAttendant(cedula: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/attendant/' + cedula);
  }

  public countByTownship(municipio: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/township/' + municipio);
  }

  public countByInstitution(institucion: string): Observable<number> {
    return this.http.get<number>(this.endPoint + '/count/institution/' + institucion);
  }
}
