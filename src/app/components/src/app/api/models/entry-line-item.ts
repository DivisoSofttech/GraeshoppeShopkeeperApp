/* tslint:disable */
import { Product } from './product';
import { StockEntry } from './stock-entry';
export interface EntryLineItem {
  description?: string;
  id?: number;
  product?: Product;
  quantityAdjustment?: number;
  stockEntry?: StockEntry;
  valueAdjustment?: number;
}
