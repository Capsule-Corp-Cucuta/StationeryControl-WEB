import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Institution } from '../models/institution.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private endPoint = environment.APIUrl + 'institution';

  constructor(private http: HttpClient) {}

  public create(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.endPoint, institution);
  }

  public delete(institution: Institution): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: institution,
    };
    return this.http.delete<Response>(this.endPoint, options);
  }

  public findAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.endPoint + '/all');
  }

  public findByName(name: string): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.endPoint + '/name/' + name);
  }

  public findByTownship(township: string): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.endPoint + '/township/' + township);
  }

  public findByAttendant(attendant: string): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.endPoint + '/attendant/' + attendant);
  }
}
