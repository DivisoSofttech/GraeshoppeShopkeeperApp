/* tslint:disable */
import { OrderMaster } from './order-master';
export interface ReportSummary {
  collectionCard?: Array<OrderMaster>;
  collectionCash?: Array<OrderMaster>;
  date?: string;
  deliveryCard?: Array<OrderMaster>;
  deliveryCash?: Array<OrderMaster>;
  storeId?: string;
  typeAllCount?: number;
  typeAllTotal?: number;
  typeCardCount?: number;
  typeCardTotal?: number;
  typeCashCount?: number;
  typeCashTotal?: number;
  typeCollectionCount?: number;
  typeCollectionTotal?: number;
  typeDeliveryCount?: number;
  typeDeliveryTotal?: number;
}
