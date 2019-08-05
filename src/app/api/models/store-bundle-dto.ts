/* tslint:disable */
import { BannerDTO } from './banner-dto';
import { DeliveryInfoDTO } from './delivery-info-dto';
import { StoreDTO } from './store-dto';
import { StoreAddressDTO } from './store-address-dto';
import { StoreSettingsDTO } from './store-settings-dto';
import { StoreTypeDTO } from './store-type-dto';
import { TypeDTO } from './type-dto';
export interface StoreBundleDTO {
  banners?: Array<BannerDTO>;
  deliveryInfos?: Array<DeliveryInfoDTO>;
  store?: StoreDTO;
  storeAddress?: StoreAddressDTO;
  storeSettings?: StoreSettingsDTO;
  storeType?: Array<StoreTypeDTO>;
  types?: Array<TypeDTO>;
}
