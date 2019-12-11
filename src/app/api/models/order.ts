/* tslint:disable */
import { Offer } from './offer';
import { DeliveryInfo } from './delivery-info';
import { ApprovalDetails } from './approval-details';
import { OrderLine } from './order-line';
import { Status } from './status';
export interface Order {
  id?: number;
  appliedOffers?: Array<Offer>;
  customerId?: string;
  date?: string;
  deliveryInfo?: DeliveryInfo;
  email?: string;
  grandTotal?: number;
  approvalDetails?: ApprovalDetails;
  orderId?: string;
  orderLines?: Array<OrderLine>;
  paymentRef?: string;
  status?: Status;
  storeId?: string;
  subTotal?: number;
}
