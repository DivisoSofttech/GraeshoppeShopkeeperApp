/* tslint:disable */
import { Location } from './location';
import { Sort } from './sort';
export interface PageOfLocation {
  content?: Array<Location>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
