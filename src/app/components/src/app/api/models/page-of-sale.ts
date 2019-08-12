/* tslint:disable */
import { Sale } from './sale';
import { Sort } from './sort';
export interface PageOfSale {
  content?: Array<Sale>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
