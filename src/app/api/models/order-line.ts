/* tslint:disable */
import { AuxItem } from './aux-item';
import { ComboItem } from './combo-item';
import { Order } from './order';
import { OrderMaster } from './order-master';
import { AuxilaryOrderLine } from './auxilary-order-line';
export interface OrderLine {
  auxItems?: Array<AuxItem>;
  comboItems?: Array<ComboItem>;
  id?: number;
  item?: string;
  order?: Order;
  orderMaster?: OrderMaster;
  pricePerUnit?: number;
  productId?: number;
  quantity?: number;
  requiedAuxilaries?: Array<AuxilaryOrderLine>;
  state?: string;
  total?: number;
}
