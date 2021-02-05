export interface User {
  username: string;
  id: string;
  userType?: UserType;
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  township?: string;
  institution?: string;
  enable?: boolean;
}

export enum UserType {
  ADMINISTRATOR,
  IDS,
  DANE,
  DEPARTMENTAL,
  MUNICIPAL,
  INSTITUTIONAL,
}
