/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CommandResource } from '../models/command-resource';
import { ApprovalDetailsDTO } from '../models/approval-details-dto';
import { AuxilaryLineItemDTO } from '../models/auxilary-line-item-dto';
import { BannerDTO } from '../models/banner-dto';
import { CategoryDTO } from '../models/category-dto';
import { ComboLineItemDTO } from '../models/combo-line-item-dto';
import { ContactDTO } from '../models/contact-dto';
import { CustomerDTO } from '../models/customer-dto';
import { CustomerAggregator } from '../models/customer-aggregator';
import { DeliveryInfoDTO } from '../models/delivery-info-dto';
import { DiscountDTO } from '../models/discount-dto';
import { EntryLineItemDTO } from '../models/entry-line-item-dto';
import { LocationDTO } from '../models/location-dto';
import { NotificationDTO } from '../models/notification-dto';
import { ProductDTO } from '../models/product-dto';
import { ReasonDTO } from '../models/reason-dto';
import { ReplyDTO } from '../models/reply-dto';
import { ReviewDTO } from '../models/review-dto';
import { SaleDTO } from '../models/sale-dto';
import { StockCurrentDTO } from '../models/stock-current-dto';
import { StockEntryDTO } from '../models/stock-entry-dto';
import { StoreBundleDTO } from '../models/store-bundle-dto';
import { StoreDTO } from '../models/store-dto';
import { TicketLineDTO } from '../models/ticket-line-dto';
import { TypeDTO } from '../models/type-dto';
import { UOMDTO } from '../models/uomdto';
import { UserRatingDTO } from '../models/user-rating-dto';

/**
 * Command Resource
 */
@Injectable({
  providedIn: 'root',
})
class CommandResourceService extends __BaseService {
  static readonly acceptOrderUsingPOSTPath = '/api/command/acceptOrder/{taskId}';
  static readonly createAuxilaryLineItemUsingPOSTPath = '/api/command/auxilarylineitem';
  static readonly updateAuxilaryLineItemUsingPUTPath = '/api/command/auxilarylineitem';
  static readonly deleteAuxilaryLineIteamUsingDELETEPath = '/api/command/auxilarylineitem/{id}';
  static readonly createBannerUsingPOSTPath = '/api/command/banner';
  static readonly updateBannerUsingPUTPath = '/api/command/banner';
  static readonly deleteBannerUsingDELETEPath = '/api/command/banner/{id}';
  static readonly updateCategoryUsingPUTPath = '/api/command/categories';
  static readonly deleteCategoryUsingDELETEPath = '/api/command/categories/{id}';
  static readonly createComboLineItemUsingPOSTPath = '/api/command/combolineitem';
  static readonly updateComboLineItemUsingPUTPath = '/api/command/combolineitem';
  static readonly deleteComboLineItemUsingDELETEPath = '/api/command/combolineitem/{id}';
  static readonly updateContactUsingPUTPath = '/api/command/contacts';
  static readonly deleteContactUsingDELETEPath = '/api/command/contacts/{id}';
  static readonly updateCustomerUsingPUTPath = '/api/command/customers';
  static readonly createCustomerUsingPOSTPath = '/api/command/customers/register-customer';
  static readonly deleteCustomerUsingDELETEPath = '/api/command/customers/{id}';
  static readonly createDeliveryInfoUsingPOSTPath = '/api/command/delivery-infos';
  static readonly updateDeliveryInfoUsingPUTPath = '/api/command/delivery-infos';
  static readonly deleteDeliveryInfoUsingDELETEPath = '/api/command/delivery-infos/{id}';
  static readonly createDiscountUsingPOSTPath = '/api/command/discount';
  static readonly updateDiscountUsingPUTPath = '/api/command/discount';
  static readonly deleteDiscountUsingDELETEPath = '/api/command/discount/{id}';
  static readonly createEntryLineItemUsingPOSTPath = '/api/command/entryLineItem';
  static readonly updateEntryLineItemUsingPUTPath = '/api/command/entryLineItem';
  static readonly deleteEntryLineItemUsingDELETEPath = '/api/command/entryLineItem/{id}';
  static readonly createLocationUsingPOSTPath = '/api/command/location';
  static readonly updateLocationUsingPUTPath = '/api/command/location';
  static readonly deleteLocationUsingDELETEPath = '/api/command/location/{id}';
  static readonly markOrderAsDeliveredUsingPOSTPath = '/api/command/markAsDelivered/{orderId}';
  static readonly updateNotificationUsingPUTPath = '/api/command/notifications';
  static readonly createProductCategoryUsingPOSTPath = '/api/command/productCategory';
  static readonly createProductUsingPOSTPath = '/api/command/products';
  static readonly updateProductUsingPUTPath = '/api/command/products';
  static readonly deleteProductUsingDELETEPath = '/api/command/products/{id}';
  static readonly createReasonUsingPOSTPath = '/api/command/reason';
  static readonly updateReasonUsingPUTPath = '/api/command/reason';
  static readonly deleteReasonUsingDELETEPath = '/api/command/reason/{id}';
  static readonly createReplyUsingPOSTPath = '/api/command/replies';
  static readonly updateReplyUsingPUTPath = '/api/command/replies';
  static readonly deleteReplyUsingDELETEPath = '/api/command/replies/{id}';
  static readonly createUserRatingUsingPOSTPath = '/api/command/reviews';
  static readonly updateUserRatingUsingPUTPath = '/api/command/reviews';
  static readonly deleteReviewUsingDELETEPath = '/api/command/reviews/{id}';
  static readonly createSaleUsingPOSTPath = '/api/command/sales';
  static readonly updateSaleUsingPUTPath = '/api/command/sales';
  static readonly deleteSaleUsingDELETEPath = '/api/command/sales/{id}';
  static readonly createStockCurrentUsingPOSTPath = '/api/command/stock-currents';
  static readonly updateStockCurrentUsingPUTPath = '/api/command/stock-currents';
  static readonly createStockEntryUsingPOSTPath = '/api/command/stock-entry';
  static readonly updateStockEntryUsingPUTPath = '/api/command/stock-entry';
  static readonly deleteStockEntryUsingDELETEPath = '/api/command/stock-entry/{id}';
  static readonly deleteStoreTypeUsingDELETEPath = '/api/command/store-types/{id}';
  static readonly createStoreBundleUsingPOSTPath = '/api/command/storeBundle';
  static readonly createStoreUsingPOSTPath = '/api/command/stores';
  static readonly updateStoreUsingPUTPath = '/api/command/stores';
  static readonly deleteStoreUsingDELETEPath = '/api/command/stores/{id}';
  static readonly createTickerLineUsingPOSTPath = '/api/command/ticket-lines';
  static readonly updateTicketLineUsingPUTPath = '/api/command/ticket-lines';
  static readonly deleteTicketlineUsingDELETEPath = '/api/command/ticket-lines/{id}';
  static readonly createTypeUsingPOSTPath = '/api/command/types';
  static readonly updateTypeUsingPUTPath = '/api/command/types';
  static readonly deleteTypeUsingDELETEPath = '/api/command/types/{id}';
  static readonly createUOMUsingPOSTPath = '/api/command/unit-of-meassurement';
  static readonly updateUOMUsingPUTPath = '/api/command/uoms';
  static readonly deleteUOMUsingDELETEPath = '/api/command/uoms/{id}';
  static readonly createUserRatingUsingPOST1Path = '/api/command/user-ratings';
  static readonly updateUserRatingUsingPUT1Path = '/api/command/user-ratings';
  static readonly deleteUserRatingUsingDELETEPath = '/api/command/user-ratings/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CommandResourceService.AcceptOrderUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `approvalDetailsDTO`: approvalDetailsDTO
   *
   * @return OK
   */
  acceptOrderUsingPOSTResponse(params: CommandResourceService.AcceptOrderUsingPOSTParams): __Observable<__StrictHttpResponse<CommandResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.approvalDetailsDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/acceptOrder/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandResource>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.AcceptOrderUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `approvalDetailsDTO`: approvalDetailsDTO
   *
   * @return OK
   */
  acceptOrderUsingPOST(params: CommandResourceService.AcceptOrderUsingPOSTParams): __Observable<CommandResource> {
    return this.acceptOrderUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as CommandResource)
    );
  }

  /**
   * @param auxilaryLineItemDTO auxilaryLineItemDTO
   * @return OK
   */
  createAuxilaryLineItemUsingPOSTResponse(auxilaryLineItemDTO: AuxilaryLineItemDTO): __Observable<__StrictHttpResponse<AuxilaryLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = auxilaryLineItemDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/auxilarylineitem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuxilaryLineItemDTO>;
      })
    );
  }
  /**
   * @param auxilaryLineItemDTO auxilaryLineItemDTO
   * @return OK
   */
  createAuxilaryLineItemUsingPOST(auxilaryLineItemDTO: AuxilaryLineItemDTO): __Observable<AuxilaryLineItemDTO> {
    return this.createAuxilaryLineItemUsingPOSTResponse(auxilaryLineItemDTO).pipe(
      __map(_r => _r.body as AuxilaryLineItemDTO)
    );
  }

  /**
   * @param auxilaryLineItemDTO auxilaryLineItemDTO
   * @return OK
   */
  updateAuxilaryLineItemUsingPUTResponse(auxilaryLineItemDTO: AuxilaryLineItemDTO): __Observable<__StrictHttpResponse<AuxilaryLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = auxilaryLineItemDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/auxilarylineitem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuxilaryLineItemDTO>;
      })
    );
  }
  /**
   * @param auxilaryLineItemDTO auxilaryLineItemDTO
   * @return OK
   */
  updateAuxilaryLineItemUsingPUT(auxilaryLineItemDTO: AuxilaryLineItemDTO): __Observable<AuxilaryLineItemDTO> {
    return this.updateAuxilaryLineItemUsingPUTResponse(auxilaryLineItemDTO).pipe(
      __map(_r => _r.body as AuxilaryLineItemDTO)
    );
  }

  /**
   * @param id id
   */
  deleteAuxilaryLineIteamUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/auxilarylineitem/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteAuxilaryLineIteamUsingDELETE(id: number): __Observable<null> {
    return this.deleteAuxilaryLineIteamUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param bannerDTO bannerDTO
   * @return OK
   */
  createBannerUsingPOSTResponse(bannerDTO: BannerDTO): __Observable<__StrictHttpResponse<BannerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = bannerDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/banner`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<BannerDTO>;
      })
    );
  }
  /**
   * @param bannerDTO bannerDTO
   * @return OK
   */
  createBannerUsingPOST(bannerDTO: BannerDTO): __Observable<BannerDTO> {
    return this.createBannerUsingPOSTResponse(bannerDTO).pipe(
      __map(_r => _r.body as BannerDTO)
    );
  }

  /**
   * @param bannerDTO bannerDTO
   * @return OK
   */
  updateBannerUsingPUTResponse(bannerDTO: BannerDTO): __Observable<__StrictHttpResponse<BannerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = bannerDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/banner`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<BannerDTO>;
      })
    );
  }
  /**
   * @param bannerDTO bannerDTO
   * @return OK
   */
  updateBannerUsingPUT(bannerDTO: BannerDTO): __Observable<BannerDTO> {
    return this.updateBannerUsingPUTResponse(bannerDTO).pipe(
      __map(_r => _r.body as BannerDTO)
    );
  }

  /**
   * @param id id
   */
  deleteBannerUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/banner/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteBannerUsingDELETE(id: number): __Observable<null> {
    return this.deleteBannerUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param categoryDTO categoryDTO
   * @return OK
   */
  updateCategoryUsingPUTResponse(categoryDTO: CategoryDTO): __Observable<__StrictHttpResponse<CategoryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = categoryDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoryDTO>;
      })
    );
  }
  /**
   * @param categoryDTO categoryDTO
   * @return OK
   */
  updateCategoryUsingPUT(categoryDTO: CategoryDTO): __Observable<CategoryDTO> {
    return this.updateCategoryUsingPUTResponse(categoryDTO).pipe(
      __map(_r => _r.body as CategoryDTO)
    );
  }

  /**
   * @param id id
   */
  deleteCategoryUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/categories/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteCategoryUsingDELETE(id: number): __Observable<null> {
    return this.deleteCategoryUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param comboLineItemDTO comboLineItemDTO
   * @return OK
   */
  createComboLineItemUsingPOSTResponse(comboLineItemDTO: ComboLineItemDTO): __Observable<__StrictHttpResponse<ComboLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = comboLineItemDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/combolineitem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComboLineItemDTO>;
      })
    );
  }
  /**
   * @param comboLineItemDTO comboLineItemDTO
   * @return OK
   */
  createComboLineItemUsingPOST(comboLineItemDTO: ComboLineItemDTO): __Observable<ComboLineItemDTO> {
    return this.createComboLineItemUsingPOSTResponse(comboLineItemDTO).pipe(
      __map(_r => _r.body as ComboLineItemDTO)
    );
  }

  /**
   * @param comboLineItemDTO comboLineItemDTO
   * @return OK
   */
  updateComboLineItemUsingPUTResponse(comboLineItemDTO: ComboLineItemDTO): __Observable<__StrictHttpResponse<ComboLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = comboLineItemDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/combolineitem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComboLineItemDTO>;
      })
    );
  }
  /**
   * @param comboLineItemDTO comboLineItemDTO
   * @return OK
   */
  updateComboLineItemUsingPUT(comboLineItemDTO: ComboLineItemDTO): __Observable<ComboLineItemDTO> {
    return this.updateComboLineItemUsingPUTResponse(comboLineItemDTO).pipe(
      __map(_r => _r.body as ComboLineItemDTO)
    );
  }

  /**
   * @param id id
   */
  deleteComboLineItemUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/combolineitem/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteComboLineItemUsingDELETE(id: number): __Observable<null> {
    return this.deleteComboLineItemUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param contact contact
   * @return OK
   */
  updateContactUsingPUTResponse(contact: ContactDTO): __Observable<__StrictHttpResponse<ContactDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = contact;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/contacts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactDTO>;
      })
    );
  }
  /**
   * @param contact contact
   * @return OK
   */
  updateContactUsingPUT(contact: ContactDTO): __Observable<ContactDTO> {
    return this.updateContactUsingPUTResponse(contact).pipe(
      __map(_r => _r.body as ContactDTO)
    );
  }

  /**
   * @param id id
   */
  deleteContactUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/contacts/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteContactUsingDELETE(id: number): __Observable<null> {
    return this.deleteContactUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param customerDTO customerDTO
   * @return OK
   */
  updateCustomerUsingPUTResponse(customerDTO: CustomerDTO): __Observable<__StrictHttpResponse<CustomerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = customerDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/customers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomerDTO>;
      })
    );
  }
  /**
   * @param customerDTO customerDTO
   * @return OK
   */
  updateCustomerUsingPUT(customerDTO: CustomerDTO): __Observable<CustomerDTO> {
    return this.updateCustomerUsingPUTResponse(customerDTO).pipe(
      __map(_r => _r.body as CustomerDTO)
    );
  }

  /**
   * @param customerAggregator customerAggregator
   * @return OK
   */
  createCustomerUsingPOSTResponse(customerAggregator: CustomerAggregator): __Observable<__StrictHttpResponse<CustomerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = customerAggregator;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/customers/register-customer`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomerDTO>;
      })
    );
  }
  /**
   * @param customerAggregator customerAggregator
   * @return OK
   */
  createCustomerUsingPOST(customerAggregator: CustomerAggregator): __Observable<CustomerDTO> {
    return this.createCustomerUsingPOSTResponse(customerAggregator).pipe(
      __map(_r => _r.body as CustomerDTO)
    );
  }

  /**
   * @param id id
   */
  deleteCustomerUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/customers/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteCustomerUsingDELETE(id: number): __Observable<null> {
    return this.deleteCustomerUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param deliveryInfoDTO deliveryInfoDTO
   * @return OK
   */
  createDeliveryInfoUsingPOSTResponse(deliveryInfoDTO: DeliveryInfoDTO): __Observable<__StrictHttpResponse<DeliveryInfoDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = deliveryInfoDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/delivery-infos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DeliveryInfoDTO>;
      })
    );
  }
  /**
   * @param deliveryInfoDTO deliveryInfoDTO
   * @return OK
   */
  createDeliveryInfoUsingPOST(deliveryInfoDTO: DeliveryInfoDTO): __Observable<DeliveryInfoDTO> {
    return this.createDeliveryInfoUsingPOSTResponse(deliveryInfoDTO).pipe(
      __map(_r => _r.body as DeliveryInfoDTO)
    );
  }

  /**
   * @param deliveryInfoDTO deliveryInfoDTO
   * @return OK
   */
  updateDeliveryInfoUsingPUTResponse(deliveryInfoDTO: DeliveryInfoDTO): __Observable<__StrictHttpResponse<DeliveryInfoDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = deliveryInfoDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/delivery-infos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DeliveryInfoDTO>;
      })
    );
  }
  /**
   * @param deliveryInfoDTO deliveryInfoDTO
   * @return OK
   */
  updateDeliveryInfoUsingPUT(deliveryInfoDTO: DeliveryInfoDTO): __Observable<DeliveryInfoDTO> {
    return this.updateDeliveryInfoUsingPUTResponse(deliveryInfoDTO).pipe(
      __map(_r => _r.body as DeliveryInfoDTO)
    );
  }

  /**
   * @param id id
   */
  deleteDeliveryInfoUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/delivery-infos/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteDeliveryInfoUsingDELETE(id: number): __Observable<null> {
    return this.deleteDeliveryInfoUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param discountDTO discountDTO
   * @return OK
   */
  createDiscountUsingPOSTResponse(discountDTO: DiscountDTO): __Observable<__StrictHttpResponse<DiscountDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = discountDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/discount`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DiscountDTO>;
      })
    );
  }
  /**
   * @param discountDTO discountDTO
   * @return OK
   */
  createDiscountUsingPOST(discountDTO: DiscountDTO): __Observable<DiscountDTO> {
    return this.createDiscountUsingPOSTResponse(discountDTO).pipe(
      __map(_r => _r.body as DiscountDTO)
    );
  }

  /**
   * @param discountDTO discountDTO
   * @return OK
   */
  updateDiscountUsingPUTResponse(discountDTO: DiscountDTO): __Observable<__StrictHttpResponse<DiscountDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = discountDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/discount`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DiscountDTO>;
      })
    );
  }
  /**
   * @param discountDTO discountDTO
   * @return OK
   */
  updateDiscountUsingPUT(discountDTO: DiscountDTO): __Observable<DiscountDTO> {
    return this.updateDiscountUsingPUTResponse(discountDTO).pipe(
      __map(_r => _r.body as DiscountDTO)
    );
  }

  /**
   * @param id id
   */
  deleteDiscountUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/discount/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteDiscountUsingDELETE(id: number): __Observable<null> {
    return this.deleteDiscountUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param entrylineitemDTO entrylineitemDTO
   * @return OK
   */
  createEntryLineItemUsingPOSTResponse(entrylineitemDTO: EntryLineItemDTO): __Observable<__StrictHttpResponse<EntryLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entrylineitemDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/entryLineItem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EntryLineItemDTO>;
      })
    );
  }
  /**
   * @param entrylineitemDTO entrylineitemDTO
   * @return OK
   */
  createEntryLineItemUsingPOST(entrylineitemDTO: EntryLineItemDTO): __Observable<EntryLineItemDTO> {
    return this.createEntryLineItemUsingPOSTResponse(entrylineitemDTO).pipe(
      __map(_r => _r.body as EntryLineItemDTO)
    );
  }

  /**
   * @param entrylineitemDTO entrylineitemDTO
   * @return OK
   */
  updateEntryLineItemUsingPUTResponse(entrylineitemDTO: EntryLineItemDTO): __Observable<__StrictHttpResponse<EntryLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entrylineitemDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/entryLineItem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EntryLineItemDTO>;
      })
    );
  }
  /**
   * @param entrylineitemDTO entrylineitemDTO
   * @return OK
   */
  updateEntryLineItemUsingPUT(entrylineitemDTO: EntryLineItemDTO): __Observable<EntryLineItemDTO> {
    return this.updateEntryLineItemUsingPUTResponse(entrylineitemDTO).pipe(
      __map(_r => _r.body as EntryLineItemDTO)
    );
  }

  /**
   * @param id id
   */
  deleteEntryLineItemUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/entryLineItem/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteEntryLineItemUsingDELETE(id: number): __Observable<null> {
    return this.deleteEntryLineItemUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param locationDTO locationDTO
   * @return OK
   */
  createLocationUsingPOSTResponse(locationDTO: LocationDTO): __Observable<__StrictHttpResponse<LocationDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = locationDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/location`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LocationDTO>;
      })
    );
  }
  /**
   * @param locationDTO locationDTO
   * @return OK
   */
  createLocationUsingPOST(locationDTO: LocationDTO): __Observable<LocationDTO> {
    return this.createLocationUsingPOSTResponse(locationDTO).pipe(
      __map(_r => _r.body as LocationDTO)
    );
  }

  /**
   * @param locationDTO locationDTO
   * @return OK
   */
  updateLocationUsingPUTResponse(locationDTO: LocationDTO): __Observable<__StrictHttpResponse<LocationDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = locationDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/location`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LocationDTO>;
      })
    );
  }
  /**
   * @param locationDTO locationDTO
   * @return OK
   */
  updateLocationUsingPUT(locationDTO: LocationDTO): __Observable<LocationDTO> {
    return this.updateLocationUsingPUTResponse(locationDTO).pipe(
      __map(_r => _r.body as LocationDTO)
    );
  }

  /**
   * @param id id
   */
  deleteLocationUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/location/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteLocationUsingDELETE(id: number): __Observable<null> {
    return this.deleteLocationUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param orderId orderId
   */
  markOrderAsDeliveredUsingPOSTResponse(orderId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/markAsDelivered/${orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param orderId orderId
   */
  markOrderAsDeliveredUsingPOST(orderId: string): __Observable<null> {
    return this.markOrderAsDeliveredUsingPOSTResponse(orderId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param notificationDTO notificationDTO
   * @return OK
   */
  updateNotificationUsingPUTResponse(notificationDTO: NotificationDTO): __Observable<__StrictHttpResponse<NotificationDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = notificationDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/notifications`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NotificationDTO>;
      })
    );
  }
  /**
   * @param notificationDTO notificationDTO
   * @return OK
   */
  updateNotificationUsingPUT(notificationDTO: NotificationDTO): __Observable<NotificationDTO> {
    return this.updateNotificationUsingPUTResponse(notificationDTO).pipe(
      __map(_r => _r.body as NotificationDTO)
    );
  }

  /**
   * @param categoryDTO categoryDTO
   * @return OK
   */
  createProductCategoryUsingPOSTResponse(categoryDTO: CategoryDTO): __Observable<__StrictHttpResponse<CategoryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = categoryDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/productCategory`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoryDTO>;
      })
    );
  }
  /**
   * @param categoryDTO categoryDTO
   * @return OK
   */
  createProductCategoryUsingPOST(categoryDTO: CategoryDTO): __Observable<CategoryDTO> {
    return this.createProductCategoryUsingPOSTResponse(categoryDTO).pipe(
      __map(_r => _r.body as CategoryDTO)
    );
  }

  /**
   * @param productDTO productDTO
   * @return OK
   */
  createProductUsingPOSTResponse(productDTO: ProductDTO): __Observable<__StrictHttpResponse<ProductDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = productDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductDTO>;
      })
    );
  }
  /**
   * @param productDTO productDTO
   * @return OK
   */
  createProductUsingPOST(productDTO: ProductDTO): __Observable<ProductDTO> {
    return this.createProductUsingPOSTResponse(productDTO).pipe(
      __map(_r => _r.body as ProductDTO)
    );
  }

  /**
   * @param productDTO productDTO
   * @return OK
   */
  updateProductUsingPUTResponse(productDTO: ProductDTO): __Observable<__StrictHttpResponse<ProductDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = productDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductDTO>;
      })
    );
  }
  /**
   * @param productDTO productDTO
   * @return OK
   */
  updateProductUsingPUT(productDTO: ProductDTO): __Observable<ProductDTO> {
    return this.updateProductUsingPUTResponse(productDTO).pipe(
      __map(_r => _r.body as ProductDTO)
    );
  }

  /**
   * @param id id
   */
  deleteProductUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/products/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteProductUsingDELETE(id: number): __Observable<null> {
    return this.deleteProductUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param reasonDTO reasonDTO
   * @return OK
   */
  createReasonUsingPOSTResponse(reasonDTO: ReasonDTO): __Observable<__StrictHttpResponse<ReasonDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = reasonDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/reason`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReasonDTO>;
      })
    );
  }
  /**
   * @param reasonDTO reasonDTO
   * @return OK
   */
  createReasonUsingPOST(reasonDTO: ReasonDTO): __Observable<ReasonDTO> {
    return this.createReasonUsingPOSTResponse(reasonDTO).pipe(
      __map(_r => _r.body as ReasonDTO)
    );
  }

  /**
   * @param reasonDTO reasonDTO
   * @return OK
   */
  updateReasonUsingPUTResponse(reasonDTO: ReasonDTO): __Observable<__StrictHttpResponse<ReasonDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = reasonDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/reason`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReasonDTO>;
      })
    );
  }
  /**
   * @param reasonDTO reasonDTO
   * @return OK
   */
  updateReasonUsingPUT(reasonDTO: ReasonDTO): __Observable<ReasonDTO> {
    return this.updateReasonUsingPUTResponse(reasonDTO).pipe(
      __map(_r => _r.body as ReasonDTO)
    );
  }

  /**
   * @param id id
   */
  deleteReasonUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/reason/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteReasonUsingDELETE(id: number): __Observable<null> {
    return this.deleteReasonUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param replyDTO replyDTO
   * @return OK
   */
  createReplyUsingPOSTResponse(replyDTO: ReplyDTO): __Observable<__StrictHttpResponse<ReplyDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = replyDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/replies`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReplyDTO>;
      })
    );
  }
  /**
   * @param replyDTO replyDTO
   * @return OK
   */
  createReplyUsingPOST(replyDTO: ReplyDTO): __Observable<ReplyDTO> {
    return this.createReplyUsingPOSTResponse(replyDTO).pipe(
      __map(_r => _r.body as ReplyDTO)
    );
  }

  /**
   * @param replyDTO replyDTO
   * @return OK
   */
  updateReplyUsingPUTResponse(replyDTO: ReplyDTO): __Observable<__StrictHttpResponse<ReplyDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = replyDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/replies`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReplyDTO>;
      })
    );
  }
  /**
   * @param replyDTO replyDTO
   * @return OK
   */
  updateReplyUsingPUT(replyDTO: ReplyDTO): __Observable<ReplyDTO> {
    return this.updateReplyUsingPUTResponse(replyDTO).pipe(
      __map(_r => _r.body as ReplyDTO)
    );
  }

  /**
   * @param id id
   */
  deleteReplyUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/replies/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteReplyUsingDELETE(id: number): __Observable<null> {
    return this.deleteReplyUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param reviewDTO reviewDTO
   * @return OK
   */
  createUserRatingUsingPOSTResponse(reviewDTO: ReviewDTO): __Observable<__StrictHttpResponse<ReviewDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = reviewDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/reviews`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReviewDTO>;
      })
    );
  }
  /**
   * @param reviewDTO reviewDTO
   * @return OK
   */
  createUserRatingUsingPOST(reviewDTO: ReviewDTO): __Observable<ReviewDTO> {
    return this.createUserRatingUsingPOSTResponse(reviewDTO).pipe(
      __map(_r => _r.body as ReviewDTO)
    );
  }

  /**
   * @param reviewDTO reviewDTO
   * @return OK
   */
  updateUserRatingUsingPUTResponse(reviewDTO: ReviewDTO): __Observable<__StrictHttpResponse<ReviewDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = reviewDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/reviews`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReviewDTO>;
      })
    );
  }
  /**
   * @param reviewDTO reviewDTO
   * @return OK
   */
  updateUserRatingUsingPUT(reviewDTO: ReviewDTO): __Observable<ReviewDTO> {
    return this.updateUserRatingUsingPUTResponse(reviewDTO).pipe(
      __map(_r => _r.body as ReviewDTO)
    );
  }

  /**
   * @param id id
   */
  deleteReviewUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/reviews/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteReviewUsingDELETE(id: number): __Observable<null> {
    return this.deleteReviewUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param saleDTO saleDTO
   * @return OK
   */
  createSaleUsingPOSTResponse(saleDTO: SaleDTO): __Observable<__StrictHttpResponse<SaleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = saleDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/sales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SaleDTO>;
      })
    );
  }
  /**
   * @param saleDTO saleDTO
   * @return OK
   */
  createSaleUsingPOST(saleDTO: SaleDTO): __Observable<SaleDTO> {
    return this.createSaleUsingPOSTResponse(saleDTO).pipe(
      __map(_r => _r.body as SaleDTO)
    );
  }

  /**
   * @param saleDTO saleDTO
   * @return OK
   */
  updateSaleUsingPUTResponse(saleDTO: SaleDTO): __Observable<__StrictHttpResponse<SaleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = saleDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/sales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SaleDTO>;
      })
    );
  }
  /**
   * @param saleDTO saleDTO
   * @return OK
   */
  updateSaleUsingPUT(saleDTO: SaleDTO): __Observable<SaleDTO> {
    return this.updateSaleUsingPUTResponse(saleDTO).pipe(
      __map(_r => _r.body as SaleDTO)
    );
  }

  /**
   * @param id id
   */
  deleteSaleUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/sales/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteSaleUsingDELETE(id: number): __Observable<null> {
    return this.deleteSaleUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param stockCurrent stockCurrent
   * @return OK
   */
  createStockCurrentUsingPOSTResponse(stockCurrent: StockCurrentDTO): __Observable<__StrictHttpResponse<StockCurrentDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stockCurrent;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/stock-currents`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockCurrentDTO>;
      })
    );
  }
  /**
   * @param stockCurrent stockCurrent
   * @return OK
   */
  createStockCurrentUsingPOST(stockCurrent: StockCurrentDTO): __Observable<StockCurrentDTO> {
    return this.createStockCurrentUsingPOSTResponse(stockCurrent).pipe(
      __map(_r => _r.body as StockCurrentDTO)
    );
  }

  /**
   * @param StockCurrent StockCurrent
   * @return OK
   */
  updateStockCurrentUsingPUTResponse(StockCurrent: StockCurrentDTO): __Observable<__StrictHttpResponse<StockCurrentDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = StockCurrent;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/stock-currents`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockCurrentDTO>;
      })
    );
  }
  /**
   * @param StockCurrent StockCurrent
   * @return OK
   */
  updateStockCurrentUsingPUT(StockCurrent: StockCurrentDTO): __Observable<StockCurrentDTO> {
    return this.updateStockCurrentUsingPUTResponse(StockCurrent).pipe(
      __map(_r => _r.body as StockCurrentDTO)
    );
  }

  /**
   * @param stockEntryDTO stockEntryDTO
   * @return OK
   */
  createStockEntryUsingPOSTResponse(stockEntryDTO: StockEntryDTO): __Observable<__StrictHttpResponse<StockEntryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stockEntryDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/stock-entry`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockEntryDTO>;
      })
    );
  }
  /**
   * @param stockEntryDTO stockEntryDTO
   * @return OK
   */
  createStockEntryUsingPOST(stockEntryDTO: StockEntryDTO): __Observable<StockEntryDTO> {
    return this.createStockEntryUsingPOSTResponse(stockEntryDTO).pipe(
      __map(_r => _r.body as StockEntryDTO)
    );
  }

  /**
   * @param stockEntryDTO stockEntryDTO
   * @return OK
   */
  updateStockEntryUsingPUTResponse(stockEntryDTO: StockEntryDTO): __Observable<__StrictHttpResponse<StockEntryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stockEntryDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/stock-entry`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockEntryDTO>;
      })
    );
  }
  /**
   * @param stockEntryDTO stockEntryDTO
   * @return OK
   */
  updateStockEntryUsingPUT(stockEntryDTO: StockEntryDTO): __Observable<StockEntryDTO> {
    return this.updateStockEntryUsingPUTResponse(stockEntryDTO).pipe(
      __map(_r => _r.body as StockEntryDTO)
    );
  }

  /**
   * @param id id
   */
  deleteStockEntryUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/stock-entry/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteStockEntryUsingDELETE(id: number): __Observable<null> {
    return this.deleteStockEntryUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id id
   */
  deleteStoreTypeUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/store-types/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteStoreTypeUsingDELETE(id: number): __Observable<null> {
    return this.deleteStoreTypeUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param storeBundleDTO storeBundleDTO
   * @return OK
   */
  createStoreBundleUsingPOSTResponse(storeBundleDTO: StoreBundleDTO): __Observable<__StrictHttpResponse<StoreBundleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = storeBundleDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/storeBundle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StoreBundleDTO>;
      })
    );
  }
  /**
   * @param storeBundleDTO storeBundleDTO
   * @return OK
   */
  createStoreBundleUsingPOST(storeBundleDTO: StoreBundleDTO): __Observable<StoreBundleDTO> {
    return this.createStoreBundleUsingPOSTResponse(storeBundleDTO).pipe(
      __map(_r => _r.body as StoreBundleDTO)
    );
  }

  /**
   * @param storeDTO storeDTO
   * @return OK
   */
  createStoreUsingPOSTResponse(storeDTO: StoreDTO): __Observable<__StrictHttpResponse<StoreDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = storeDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/stores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StoreDTO>;
      })
    );
  }
  /**
   * @param storeDTO storeDTO
   * @return OK
   */
  createStoreUsingPOST(storeDTO: StoreDTO): __Observable<StoreDTO> {
    return this.createStoreUsingPOSTResponse(storeDTO).pipe(
      __map(_r => _r.body as StoreDTO)
    );
  }

  /**
   * @param storeDTO storeDTO
   * @return OK
   */
  updateStoreUsingPUTResponse(storeDTO: StoreDTO): __Observable<__StrictHttpResponse<StoreDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = storeDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/stores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StoreDTO>;
      })
    );
  }
  /**
   * @param storeDTO storeDTO
   * @return OK
   */
  updateStoreUsingPUT(storeDTO: StoreDTO): __Observable<StoreDTO> {
    return this.updateStoreUsingPUTResponse(storeDTO).pipe(
      __map(_r => _r.body as StoreDTO)
    );
  }

  /**
   * @param id id
   */
  deleteStoreUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/stores/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteStoreUsingDELETE(id: number): __Observable<null> {
    return this.deleteStoreUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param ticketLineDTO ticketLineDTO
   * @return OK
   */
  createTickerLineUsingPOSTResponse(ticketLineDTO: TicketLineDTO): __Observable<__StrictHttpResponse<TicketLineDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ticketLineDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/ticket-lines`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TicketLineDTO>;
      })
    );
  }
  /**
   * @param ticketLineDTO ticketLineDTO
   * @return OK
   */
  createTickerLineUsingPOST(ticketLineDTO: TicketLineDTO): __Observable<TicketLineDTO> {
    return this.createTickerLineUsingPOSTResponse(ticketLineDTO).pipe(
      __map(_r => _r.body as TicketLineDTO)
    );
  }

  /**
   * @param ticketLineDTO ticketLineDTO
   * @return OK
   */
  updateTicketLineUsingPUTResponse(ticketLineDTO: TicketLineDTO): __Observable<__StrictHttpResponse<TicketLineDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ticketLineDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/ticket-lines`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TicketLineDTO>;
      })
    );
  }
  /**
   * @param ticketLineDTO ticketLineDTO
   * @return OK
   */
  updateTicketLineUsingPUT(ticketLineDTO: TicketLineDTO): __Observable<TicketLineDTO> {
    return this.updateTicketLineUsingPUTResponse(ticketLineDTO).pipe(
      __map(_r => _r.body as TicketLineDTO)
    );
  }

  /**
   * @param id id
   */
  deleteTicketlineUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/ticket-lines/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteTicketlineUsingDELETE(id: number): __Observable<null> {
    return this.deleteTicketlineUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param typeDTO typeDTO
   * @return OK
   */
  createTypeUsingPOSTResponse(typeDTO: TypeDTO): __Observable<__StrictHttpResponse<TypeDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = typeDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/types`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TypeDTO>;
      })
    );
  }
  /**
   * @param typeDTO typeDTO
   * @return OK
   */
  createTypeUsingPOST(typeDTO: TypeDTO): __Observable<TypeDTO> {
    return this.createTypeUsingPOSTResponse(typeDTO).pipe(
      __map(_r => _r.body as TypeDTO)
    );
  }

  /**
   * @param typeDTO typeDTO
   * @return OK
   */
  updateTypeUsingPUTResponse(typeDTO: TypeDTO): __Observable<__StrictHttpResponse<TypeDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = typeDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/types`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TypeDTO>;
      })
    );
  }
  /**
   * @param typeDTO typeDTO
   * @return OK
   */
  updateTypeUsingPUT(typeDTO: TypeDTO): __Observable<TypeDTO> {
    return this.updateTypeUsingPUTResponse(typeDTO).pipe(
      __map(_r => _r.body as TypeDTO)
    );
  }

  /**
   * @param id id
   */
  deleteTypeUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/types/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteTypeUsingDELETE(id: number): __Observable<null> {
    return this.deleteTypeUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param uomDTO uomDTO
   * @return OK
   */
  createUOMUsingPOSTResponse(uomDTO: UOMDTO): __Observable<__StrictHttpResponse<UOMDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = uomDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/unit-of-meassurement`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UOMDTO>;
      })
    );
  }
  /**
   * @param uomDTO uomDTO
   * @return OK
   */
  createUOMUsingPOST(uomDTO: UOMDTO): __Observable<UOMDTO> {
    return this.createUOMUsingPOSTResponse(uomDTO).pipe(
      __map(_r => _r.body as UOMDTO)
    );
  }

  /**
   * @param uomDTO uomDTO
   * @return OK
   */
  updateUOMUsingPUTResponse(uomDTO: UOMDTO): __Observable<__StrictHttpResponse<UOMDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = uomDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/uoms`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UOMDTO>;
      })
    );
  }
  /**
   * @param uomDTO uomDTO
   * @return OK
   */
  updateUOMUsingPUT(uomDTO: UOMDTO): __Observable<UOMDTO> {
    return this.updateUOMUsingPUTResponse(uomDTO).pipe(
      __map(_r => _r.body as UOMDTO)
    );
  }

  /**
   * @param id id
   */
  deleteUOMUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/uoms/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteUOMUsingDELETE(id: number): __Observable<null> {
    return this.deleteUOMUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param userRatingDTO userRatingDTO
   * @return OK
   */
  createUserRatingUsingPOST1Response(userRatingDTO: UserRatingDTO): __Observable<__StrictHttpResponse<UserRatingDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = userRatingDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/user-ratings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserRatingDTO>;
      })
    );
  }
  /**
   * @param userRatingDTO userRatingDTO
   * @return OK
   */
  createUserRatingUsingPOST1(userRatingDTO: UserRatingDTO): __Observable<UserRatingDTO> {
    return this.createUserRatingUsingPOST1Response(userRatingDTO).pipe(
      __map(_r => _r.body as UserRatingDTO)
    );
  }

  /**
   * @param userRatingDTO userRatingDTO
   * @return OK
   */
  updateUserRatingUsingPUT1Response(userRatingDTO: UserRatingDTO): __Observable<__StrictHttpResponse<UserRatingDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = userRatingDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/user-ratings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserRatingDTO>;
      })
    );
  }
  /**
   * @param userRatingDTO userRatingDTO
   * @return OK
   */
  updateUserRatingUsingPUT1(userRatingDTO: UserRatingDTO): __Observable<UserRatingDTO> {
    return this.updateUserRatingUsingPUT1Response(userRatingDTO).pipe(
      __map(_r => _r.body as UserRatingDTO)
    );
  }

  /**
   * @param id id
   */
  deleteUserRatingUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/command/user-ratings/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteUserRatingUsingDELETE(id: number): __Observable<null> {
    return this.deleteUserRatingUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CommandResourceService {

  /**
   * Parameters for acceptOrderUsingPOST
   */
  export interface AcceptOrderUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * approvalDetailsDTO
     */
    approvalDetailsDTO: ApprovalDetailsDTO;
  }
}

export { CommandResourceService }
