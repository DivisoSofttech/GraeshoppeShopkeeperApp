/* tslint:disable */
import { AuxilaryLineItem } from './auxilary-line-item';
import { ComboLineItem } from './combo-line-item';
import { Discount } from './discount';
import { Product } from './product';
export interface ProductBundle {
  auxilaryLineItems?: Array<AuxilaryLineItem>;
  comboLineItems?: Array<ComboLineItem>;
  discount?: Discount;
  product?: Product;
}
