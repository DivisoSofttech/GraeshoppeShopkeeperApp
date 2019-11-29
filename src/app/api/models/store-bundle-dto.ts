/* tslint:disable */
import { BannerDTO } from './banner-dto';
import { DeliveryInfoDTO } from './delivery-info-dto';
import { PreOrderSettings } from './pre-order-settings';
import { StoreDTO } from './store-dto';
import { StoreAddressDTO } from './store-address-dto';
import { StoreSettingsDTO } from './store-settings-dto';
import { StoreTypeDTO } from './store-type-dto';
import { TypeDTO } from './type-dto';
export interface StoreBundleDTO {
  banners?: Array<BannerDTO>;
  deliveryInfos?: Array<DeliveryInfoDTO>;
  preOrderSettings?: PreOrderSettings;
  store?: StoreDTO;
  storeAddress?: StoreAddressDTO;
  storeSettings?: StoreSettingsDTO;
  storeType?: Array<StoreTypeDTO>;
  types?: Array<TypeDTO>;
}
