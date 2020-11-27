export interface Delivery {
  tradeNumber: string;
  deliveryType: DeliveryType;
  firstCertificate?: number;
  lastCertificate?: number;
  sender?: string;
  receiver?: string;
}

export enum DeliveryType {
  DEPARTURE,
  REGRESS,
}
