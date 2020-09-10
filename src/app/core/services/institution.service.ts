import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public findAll(page: number): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.endPoint + '/all/' + page);
  }

  public findByInstitutionName(name: string, page: number): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.endPoint + '/name/' + name + '/' + page);
  }

  public delete(name: string): Observable<Response> {
    return this.http.delete<Response>(this.endPoint + '/' + name);
  }
}
