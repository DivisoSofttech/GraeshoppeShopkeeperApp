/* tslint:disable */
import { TicketLine } from './ticket-line';
export interface Sale {
  customerId?: number;
  date?: string;
  grandTotal?: number;
  id?: number;
  ticketLines?: Array<TicketLine>;
  userId?: string;
}
