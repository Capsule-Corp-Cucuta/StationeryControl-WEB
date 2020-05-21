export interface Certificado {
  attendant?: string;
  department?: string;
  institution?: string;
  number?: number;
  state?: CertificateState;
  township?: string;
  type?: 'CertificateType';
  verificationCode?: number;
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
