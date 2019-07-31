/* tslint:disable */
import { DeliveryInfoDTO } from './delivery-info-dto';
import { StoreDTO } from './store-dto';
import { TypeDTO } from './type-dto';
export interface StoreBundleDTO {
  deliveryInfos?: Array<DeliveryInfoDTO>;
  store?: StoreDTO;
  types?: Array<TypeDTO>;
}
