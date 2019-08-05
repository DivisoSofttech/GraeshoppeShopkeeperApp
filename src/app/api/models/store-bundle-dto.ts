/* tslint:disable */
import { BannerDTO } from './banner-dto';
import { DeliveryInfoDTO } from './delivery-info-dto';
import { StoreDTO } from './store-dto';
import { StoreTypeDTO } from './store-type-dto';
import { TypeDTO } from './type-dto';
export interface StoreBundleDTO {
  banners?: Array<BannerDTO>;
  deliveryInfos?: Array<DeliveryInfoDTO>;
  store?: StoreDTO;
  storeType?: Array<StoreTypeDTO>;
  types?: Array<TypeDTO>;
}
