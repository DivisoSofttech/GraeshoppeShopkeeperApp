/* tslint:disable */
import { OfferLine } from './offer-line';
import { OrderLine } from './order-line';
export interface OrderMaster {
  addressType?: string;
  allergyNote?: string;
  alternatePhone?: number;
  city?: string;
  customerId?: string;
  customerName?: string;
  customerOrder?: number;
  deliveryCharge?: number;
  email?: string;
  expectedDelivery?: string;
  houseNoOrBuildingName?: string;
  id?: number;
  landmark?: string;
  methodOfOrder?: string;
  name?: string;
  notes?: string;
  offerLines?: Array<OfferLine>;
  orderAcceptedAt?: string;
  orderDiscountAmount?: number;
  orderFromCustomer?: number;
  orderLines?: Array<OrderLine>;
  orderNumber?: string;
  orderPlaceAt?: string;
  orderStatus?: string;
  paymentRef?: string;
  paymentStatus?: string;
  phone?: number;
  pincode?: string;
  preOrderDate?: string;
  roadNameAreaOrStreet?: string;
  serviceCharge?: number;
  state?: string;
  storeIdpcode?: string;
  storeName?: string;
  storePhone?: number;
  storelocationName?: string;
  subTotal?: number;
  totalDue?: number;
  zoneId?: string;
}
