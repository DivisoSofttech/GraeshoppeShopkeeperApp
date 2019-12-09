/* tslint:disable */
import { TicketLine } from './ticket-line';
export interface Sale {
  customerId?: number;
  date?: string;
  grandTotal?: number;
  id?: number;
  idpCode?: string;
  paymentMode?: string;
  paymentRef?: string;
  saleUniqueId?: string;
  storeName?: string;
  ticketLines?: Array<TicketLine>;
}
