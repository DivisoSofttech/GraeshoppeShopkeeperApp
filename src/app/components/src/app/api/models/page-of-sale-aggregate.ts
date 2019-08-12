/* tslint:disable */
import { SaleAggregate } from './sale-aggregate';
import { Sort } from './sort';
export interface PageOfSaleAggregate {
  content?: Array<SaleAggregate>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
