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
import { Certificate } from '../models/certificate.model';
import { Delivery } from '../models/delivery.model';

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

  public createCertificate(certificate: Certificate): Observable<Certificate> {
    return this.certificateService.create(certificate);
  }

  public createMultipleCertificates(certificates: Certificate[]): Observable<Response> {
    return this.certificateService.createMultiple(certificates);
  }

  public findCertificateByNumber(id: number): Observable<Certificate> {
    return this.certificateService.findByNumber(id);
  }

  public findAllCertificates(page: number): Observable<Certificate[]> {
    return this.certificateService.findAll(page);
  }

  public findCertificatesByAttendant(attendant: string, page: number): Observable<Certificate[]> {
    return this.certificateService.findByAttendant(attendant, page);
  }

  public updateCertificate(id: number, certificate: Certificate): Observable<Certificate> {
    return this.certificateService.update(id, certificate);
  }

  public postCertificateFile(id: number, file: FormData): Observable<Response> {
    return this.certificateService.postFile(id, file);
  }

  public findFileByCertificateId(id: number): Observable<any> {
    return this.certificateService.findFileById(id);
  }

  public findCertificatesBetweenNumbers(firstNumber: number, lastNumber: number): Observable<Certificate[]> {
    return this.certificateService.findBetweenNumbers(firstNumber, lastNumber);
  }

  public findCertificatesByType(type: string, page: number): Observable<Certificate[]> {
    return this.certificateService.findByType(type, page);
  }

  public findCertificatesByTypeAndAttendant(type: string, attendant: string, page: number): Observable<Certificate[]> {
    return this.certificateService.findByTypeAndAttendant(type, attendant, page);
  }

  public findCertificatesByTypeAndInstitution(
    type: string,
    institution: string,
    page: number
  ): Observable<Certificate[]> {
    return this.certificateService.findByTypeAndInstitution(type, institution, page);
  }

  public findCertificatesByState(state: string, page: number): Observable<Certificate[]> {
    return this.certificateService.findByState(state, page);
  }

  public findCertificatesByStateAndAttendant(
    state: string,
    attendant: string,
    page: number
  ): Observable<Certificate[]> {
    return this.certificateService.findByStateAndAttendant(state, attendant, page);
  }

  public findCertificatesByStateAndInstitution(
    state: string,
    institution: string,
    page: number
  ): Observable<Certificate[]> {
    return this.certificateService.findByStateAndInstitution(state, institution, page);
  }

  public findCertificatesByTwonship(township: string, page: number): Observable<Certificate[]> {
    return this.certificateService.findByTwonship(township, page);
  }

  public findCertificatesByInstitution(institution: string, page: number): Observable<Certificate[]> {
    return this.certificateService.findByInstitution(institution, page);
  }

  public createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.deliveryService.create(delivery);
  }

  public findDeliveryByTradeNumber(tradeNumber: number): Observable<Delivery> {
    return this.deliveryService.findByTradeNumber(tradeNumber);
  }

  public findAllDeliveries(page: number): Observable<Delivery[]> {
    return this.deliveryService.findAll(page);
  }

  public findDeliveriesByAttendant(attendant: string, page: number): Observable<Delivery[]> {
    return this.deliveryService.findByAttendant(attendant, page);
  }

  public findDeliveriesByDate(date: Date, page: number): Observable<Delivery[]> {
    return this.deliveryService.findByDate(date, page);
  }

  public findDeliveriesByBetweenDate(startDate: Date, endDate: Date, page: number): Observable<Delivery[]> {
    return this.deliveryService.findByBetweenDate(startDate, endDate, page);
  }

  public findDeliveriesByType(type: string, page: number): Observable<Delivery[]> {
    return this.deliveryService.findByType(type, page);
  }

  public findDeliveriesByTypeAndUser(type: string, user: string, page: number): Observable<Delivery[]> {
    return this.deliveryService.findByTypeAndUser(type, user, page);
  }

  public findDeliveriesByUser(user: string, page: number): Observable<Delivery[]> {
    return this.deliveryService.findByUser(user, page);
  }

  public countDeliveries(): Observable<Response> {
    return this.deliveryService.countDeliveries();
  }

  public countDeliveriesByAttendant(cedula: string): Observable<number> {
    return this.deliveryService.countDeliveriesByAttendant(cedula);
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

  public findAllInstitutionsPage(page: number): Observable<Institution[]> {
    return this.institutionService.findAllPage(page);
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

  public countInstitutions(): Observable<Response> {
    return this.institutionService.countInstitutions();
  }
}
