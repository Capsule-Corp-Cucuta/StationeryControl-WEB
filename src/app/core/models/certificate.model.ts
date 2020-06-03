export interface Certificate {
  number: number;
  verificationCode: number;
  type: CertificateType;
  state: CertificateState;
  attendant?: string;
  department?: string;
  township?: string;
  institution?: string;
  attachment?: string;
}

export enum CertificateType {
  CA_NV,
  NV,
  CA_DEF,
  DEF,
}

export enum CertificateState {
  IDLE,
  ASSIGNED,
  GUARDED,
  STRAY,
  ANNULLED,
  WITH_INCONGRUENCES,
}
