/* tslint:disable */
import { AuxilaryLineItem } from './auxilary-line-item';
import { ComboLineItem } from './combo-line-item';
import { Product } from './product';
export interface ProductBundle {
  auxilaryLineItems?: Array<AuxilaryLineItem>;
  comboLineItems?: Array<ComboLineItem>;
  product?: Product;
}
