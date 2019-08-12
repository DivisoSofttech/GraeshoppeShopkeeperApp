/* tslint:disable */
import { AuxilaryLineItemDTO } from './auxilary-line-item-dto';
import { ComboLineItemDTO } from './combo-line-item-dto';
import { ProductDTO } from './product-dto';
export interface ProductBundle {
  auxilaryLineItems?: Array<AuxilaryLineItemDTO>;
  comboLineItems?: Array<ComboLineItemDTO>;
  productDto?: ProductDTO;
}
