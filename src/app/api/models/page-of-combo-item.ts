/* tslint:disable */
import { ComboItem } from './combo-item';
import { Sort } from './sort';
export interface PageOfComboItem {
  content?: Array<ComboItem>;
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
