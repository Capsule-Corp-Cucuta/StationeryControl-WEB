export interface User {
  identificationCard?: string;
  name?: string;
  email?: string;
  phone?: string;
  userType?: UserType;
}

export enum UserType {
  ADMINISTRATOR,
  IDS,
  DANE,
  DEPARTMENTAL,
  MUNICIPAL,
  INSTITUTIONAL,
}
