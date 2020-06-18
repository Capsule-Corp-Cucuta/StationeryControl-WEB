export interface User {
  identificationCard?: string;
  userType?: UserType;
  name?: string;
  email?: string;
  phone?: string;
}

export enum UserType {
  ADMINISTRATOR,
  IDS,
  DANE,
  DEPARTMENTAL,
  MUNICIPAL,
  INSTITUTIONAL,
}
