/* tslint:disable */
import { StockEntry } from './stock-entry';
import { Sort } from './sort';
export interface PageOfStockEntry {
  content?: Array<StockEntry>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
