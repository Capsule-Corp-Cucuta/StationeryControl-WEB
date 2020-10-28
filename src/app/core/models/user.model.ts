export interface User {
  id: string;
  userType?: UserType;
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  township?: string;
  institution?: string;
}

export enum UserType {
  ADMINISTRATOR,
  IDS,
  DANE,
  DEPARTMENTAL,
  MUNICIPAL,
  INSTITUTIONAL,
}
