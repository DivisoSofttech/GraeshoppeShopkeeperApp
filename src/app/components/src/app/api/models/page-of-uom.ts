/* tslint:disable */
import { UOM } from './uom';
import { Sort } from './sort';
export interface PageOfUOM {
  content?: Array<UOM>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
