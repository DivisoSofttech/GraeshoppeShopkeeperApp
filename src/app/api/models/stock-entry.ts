/* tslint:disable */
import { EntryLineItem } from './entry-line-item';
import { Location } from './location';
import { Reason } from './reason';
export interface StockEntry {
  date?: string;
  description?: string;
  entryLineItems?: Array<EntryLineItem>;
  iDPcode?: string;
  id?: number;
  location?: Location;
  reason?: Reason;
  reference?: string;
}
