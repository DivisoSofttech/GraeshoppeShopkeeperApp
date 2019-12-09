/* tslint:disable */
import { Sale } from './sale';
export interface TicketLine {
  id?: number;
  price?: number;
  productName?: string;
  quantity?: number;
  sale?: Sale;
  total?: number;
}
