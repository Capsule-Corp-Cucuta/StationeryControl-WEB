import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

import { User } from '../models/user.model';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { JwtModel } from '../models/JWT.model';
import { UserLogin } from '../models/login.model';
import { DeliveryService } from './delivery.service';
import { TownshipService } from './township.service';
import { StatisticsService } from './statistics.service';
import { Institution } from '../models/institution.model';
import { CertificateService } from './certificate.service';
import { InstitutionService } from './institution.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private _authService: AuthService; // tslint:disable-line
  private _tokenService: TokenService; // tslint:disable-line
  private _userService: UserService; // tslint:disable-line
  private _certificateService: CertificateService; // tslint:disable-line
  private _deliveryService: DeliveryService; // tslint:disable-line
  private _statisticsService: StatisticsService; // tslint:disable-line
  private _townshipService: TownshipService; // tslint:disable-line
  private _institutionService: InstitutionService; // tslint:disable-line

  constructor(private injector: Injector) {}

  public get authService(): AuthService {
    if (!this._authService) {
      this._authService = this.injector.get<AuthService>(AuthService);
    }
    return this._authService;
  }

  public get tokenService(): TokenService {
    if (!this._tokenService) {
      this._tokenService = this.injector.get<TokenService>(TokenService);
    }
    return this._tokenService;
  }

  public get userService(): UserService {
    if (!this._userService) {
      this._userService = this.injector.get<UserService>(UserService);
    }
    return this._userService;
  }

  public get certificateService(): CertificateService {
    if (!this._certificateService) {
      this._certificateService = this.injector.get<CertificateService>(CertificateService);
    }
    return this._certificateService;
  }

  public get deliveryService(): DeliveryService {
    if (!this._deliveryService) {
      this._deliveryService = this.injector.get<DeliveryService>(DeliveryService);
    }
    return this._deliveryService;
  }

  public get statisticsService(): StatisticsService {
    if (!this._statisticsService) {
      this._statisticsService = this.injector.get<StatisticsService>(StatisticsService);
    }
    return this._statisticsService;
  }

  public get townshipService(): TownshipService {
    if (!this._townshipService) {
      this._townshipService = this.injector.get<TownshipService>(TownshipService);
    }
    return this._townshipService;
  }

  public get institutionService(): InstitutionService {
    if (!this._institutionService) {
      this._institutionService = this.injector.get<InstitutionService>(InstitutionService);
    }
    return this._institutionService;
  }

  public login(user: UserLogin): Observable<JwtModel> {
    return this.authService.login(user);
  }

  public logOut(): void {
    return this.authService.logOut();
  }

  public setToken(token: string): void {
    this.tokenService.setToken(token);
  }

  public getToken(): string {
    return this.tokenService.getToken();
  }

  public setUser(id: string): void {
    this.tokenService.setUser(id);
  }

  public getUser(): string {
    return this.tokenService.getUser();
  }

  public setAuthorities(authorities: string[]): void {
    this.tokenService.setAuthorities(authorities);
  }

  public getAuthorities(): string[] {
    return this.tokenService.getAuthorities();
  }

  public createUser(user: User): Observable<User> {
    return this.userService.create(user);
  }

  public updateUser(user: User): Observable<User> {
    return this.userService.update(user);
  }

  public deleteUser(id: string): Observable<Response> {
    return this.userService.delete(id);
  }

  public findUserByID(id: string): Observable<User> {
    return this.userService.findByID(id);
  }

  public findAllUsers(page: number): Observable<User[]> {
    return this.userService.findAll(page);
  }

  public findUserByUserName(name: string, page: number): Observable<User[]> {
    return this.userService.findByName(name, page);
  }

  public changePassword(id: string, oldPass: string, newPass: string): Observable<Response> {
    return this.userService.changePassword(id, oldPass, newPass);
  }

  public recoverPassword(id: string): Observable<Response> {
    return this.userService.recoverPassword(id);
  }

  public countUsers(): Observable<Response> {
    return this.userService.countUsers();
  }

  public findAllTownships(): Observable<string[]> {
    return this.townshipService.findAll();
  }

  public findTownshipsByName(name: string): Observable<string[]> {
    return this.townshipService.findByName(name);
  }

  public createInstitution(institution: Institution): Observable<Institution> {
    return this.institutionService.create(institution);
  }

  public deleteInstitution(institution: Institution): Observable<Institution> {
    return this.institutionService.delete(institution);
  }

  public findAllInstitutions(): Observable<Institution[]> {
    return this.institutionService.findAll();
  }

  public findInstitutionsByName(name: string): Observable<Institution[]> {
    return this.institutionService.findByName(name);
  }

  public findInstitutionsByTownship(township: string): Observable<Institution[]> {
    return this.institutionService.findByTownship(township);
  }

  public findInstitutionsByAttendant(attendant: string): Observable<Institution[]> {
    return this.institutionService.findByAttendant(attendant);
  }
}
