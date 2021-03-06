/* tslint:disable */
import { OrderMaster } from './order-master';
import { Sort } from './sort';
export interface PageOfOrderMaster {
  content?: Array<OrderMaster>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
