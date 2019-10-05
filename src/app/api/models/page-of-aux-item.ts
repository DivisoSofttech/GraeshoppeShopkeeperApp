/* tslint:disable */
import { AuxItem } from './aux-item';
import { Sort } from './sort';
export interface PageOfAuxItem {
  content?: Array<AuxItem>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
