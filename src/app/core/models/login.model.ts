export class UserLogin {
  identificationCard: string;
  password: string;
  constructor(identificationCard: string, password: string) {
    this.identificationCard = identificationCard;
    this.password = password;
  }
}
