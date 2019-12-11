/* tslint:disable */
import { Label } from './label';
import { AuxilaryLineItem } from './auxilary-line-item';
import { Category } from './category';
import { ComboLineItem } from './combo-line-item';
import { Discount } from './discount';
import { Brand } from './brand';
import { Location } from './location';
import { Manufacturer } from './manufacturer';
import { Supplier } from './supplier';
import { TaxCategory } from './tax-category';
import { UOM } from './uom';
export interface Product {
  labels?: Array<Label>;
  auxilaryLineItems?: Array<AuxilaryLineItem>;
  buyPrice?: number;
  category?: Category;
  comboLineItems?: Array<ComboLineItem>;
  discount?: Discount;
  iDPcode?: string;
  id?: number;
  image?: string;
  imageContentType?: string;
  imageLink?: string;
  isActive?: boolean;
  isAuxilaryItem?: boolean;
  isServiceItem?: boolean;
  brand?: Brand;
  location?: Location;
  manufacturer?: Manufacturer;
  maxQuantityLevel?: number;
  minQuantityLevel?: number;
  name?: string;
  reference?: string;
  sellingPrice?: number;
  showInCatalogue?: boolean;
  sku?: string;
  storageCost?: number;
  supplier?: Supplier;
  taxCategory?: TaxCategory;
  unit?: UOM;
}
