import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private endPoint = environment.APIUrl + 'certificate';
  constructor(private http: HttpClient) {}

  public allCertificates() {
    return this.http.get(this.endPoint + '/count/all');
  }

  public findByType(tipo: string) {
    return this.http.get(this.endPoint + '/count/type/' + tipo);
  }

  public findByTypeAttendant(tipo: string, cedula: string) {
    return this.http.get(this.endPoint + '/count/type/' + tipo + '/attendant/' + cedula);
  }

  public findByTypeInstitution(tipo: string, institucion: string) {
    return this.http.get(this.endPoint + '/count/type/' + tipo + '/institution/' + institucion);
  }

  public findByState(estado: string) {
    return this.http.get(this.endPoint + '/count/state/' + estado);
  }

  public findByStateAttendant(estado: string, cedula: string) {
    return this.http.get(this.endPoint + '/count/state/' + estado + '/attendant/' + cedula);
  }

  public findByStateInstitution(estado: string, institucion: string) {
    return this.http.get(this.endPoint + '/count/state/' + estado + '/institution/' + institucion);
  }

  public findByAttendant(cedula: string) {
    return this.http.get(this.endPoint + '/count/attendant/' + cedula);
  }

  public findByTownship(municipio: string) {
    return this.http.get(this.endPoint + '/count/township/' + municipio);
  }

  public findByInstitution(institucion: string) {
    return this.http.get(this.endPoint + '/count/institution/' + institucion);
  }
}
