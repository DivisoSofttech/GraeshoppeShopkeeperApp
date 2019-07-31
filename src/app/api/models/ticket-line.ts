/* tslint:disable */
import { Sale } from './sale';
export interface TicketLine {
  id?: number;
  price?: number;
  productId?: number;
  quantity?: number;
  sale?: Sale;
  total?: number;
}
