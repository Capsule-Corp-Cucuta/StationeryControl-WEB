import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Certificado } from '../models/certificado.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  private endPoint = environment.APIUrl + 'certificate';

  constructor(private http: HttpClient) {}

  public create(certificate: Certificado) {
    return this.http.post<Certificado>(this.endPoint, certificate);
  }

  public findAll(page: number): Observable<any> {
    return this.http.get<Certificado[]>(this.endPoint + '/all/' + page);
  }

  public findByID(id: string) {
    return this.http.get(this.endPoint + '/' + id);
  }

  public update(id: string, certificate: Certificado) {
    return this.http.put(this.endPoint + '/' + id, certificate);
  }

  public findFileById(id: string): any {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.endPoint + '/' + id + '/attachment', {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }

  public postFile(id: number, file: FormData) {
    return this.http.post(this.endPoint + '/' + id + '/attachment', file);
  }
}
