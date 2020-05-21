export interface Delivery {
  tradeNumber?: string;
  firstCertificate?: number;
  lastCertificate?: number;
  sender?: string;
  receiver?: string;
  deliveryType?: DeliveryType;
}

export enum DeliveryType {
  DEPARTURE,
}
