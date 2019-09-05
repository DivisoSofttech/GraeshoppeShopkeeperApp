/* tslint:disable */
import { EntryLineItem } from './entry-line-item';
import { Location } from './location';
import { Reason } from './reason';
import { StockEntry } from './stock-entry';
export interface StockEntryBundle {
  entryLineItems?: Array<EntryLineItem>;
  location?: Location;
  reason?: Reason;
  stockEntry?: StockEntry;
}
