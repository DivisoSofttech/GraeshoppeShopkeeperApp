/* tslint:disable */
import { EntryLineItem } from './entry-line-item';
import { Sort } from './sort';
export interface PageOfEntryLineItem {
  content?: Array<EntryLineItem>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
