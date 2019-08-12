/* tslint:disable */
import { CustomerDTO } from './customer-dto';
import { Sale } from './sale';
import { TicketLine } from './ticket-line';
export interface SaleAggregate {
  customer?: CustomerDTO;
  sale?: Sale;
  ticketLines?: Array<TicketLine>;
}
