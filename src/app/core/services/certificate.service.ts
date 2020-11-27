import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Certificate } from '../models/certificate.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private endPoint = environment.APIUrl + 'certificate';

  constructor(private http: HttpClient) {}

  public create(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(this.endPoint, certificate);
  }

  public createMultiple(certificates: Certificate[]): Observable<Response> {
    return this.http.post<Response>(`${this.endPoint}/multiple`, certificates);
  }

  public findByNumber(certificateNumber: number): Observable<Certificate> {
    return this.http.get<Certificate>(this.endPoint + '/' + certificateNumber);
  }

  public findAll(page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/all/' + page);
  }

  public findByAttendant(attendant: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/attendant/' + attendant + '/' + page);
  }

  public update(id: number, certificate: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(this.endPoint + '/' + id, certificate);
  }

  public postFile(id: number, file: FormData): Observable<Response> {
    return this.http.post<Response>(this.endPoint + '/' + id + '/attachment', file);
  }

  public findFileById(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get<any>(this.endPoint + '/' + id + '/attachment', {
      headers,
      responseType: 'blob' as 'json',
    });
  }

  public findBetweenNumbers(firstNumber: number, lastNumber: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/between/' + `${firstNumber}-${lastNumber}`);
  }

  public findByType(type: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/type/' + type + '/' + page);
  }

  public findByTypeAndAttendant(type: string, attendant: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/type/' + type + '/attendant/' + attendant + '/' + page);
  }

  public findByTypeAndInstitution(type: string, institution: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/type/' + type + '/institution/' + institution + '/' + page);
  }

  public findByState(state: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/state/' + state + '/' + page);
  }

  public findByStateAndAttendant(state: string, attendant: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/state/' + state + '/attendant/' + attendant + '/' + page);
  }

  public findByStateAndInstitution(state: string, institution: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/state/' + state + '/institution/' + institution + '/' + page);
  }

  public findByTwonship(township: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/township/' + township + '/' + page);
  }

  public findByInstitution(institution: string, page: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.endPoint + '/institution/' + institution + '/' + page);
  }
}
