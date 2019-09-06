/* tslint:disable */
import { Reason } from './reason';
import { Sort } from './sort';
export interface PageOfReason {
  content?: Array<Reason>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
