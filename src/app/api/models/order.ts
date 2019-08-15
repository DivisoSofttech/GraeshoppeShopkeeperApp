/* tslint:disable */
import { DeliveryInfo } from './delivery-info';
import { OrderLine } from './order-line';
import { Status } from './status';
export interface Order {
  customerId?: string;
  date?: string;
  deliveryInfo?: DeliveryInfo;
  email?: string;
  grandTotal?: number;
  id?: number;
  notes?: string;
  orderId?: string;
  orderLines?: Array<OrderLine>;
  paymentRef?: string;
  status?: Status;
  storeId?: string;
}
