/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageOfProduct } from '../models/page-of-product';
import { BannerDTO } from '../models/banner-dto';
import { Category } from '../models/category';
import { PdfDTO } from '../models/pdf-dto';
import { PageOfCategory } from '../models/page-of-category';
import { PageOfCategoryDTO } from '../models/page-of-category-dto';
import { PageOfCustomer } from '../models/page-of-customer';
import { EntryLineItem } from '../models/entry-line-item';
import { PageOfOrderLine } from '../models/page-of-order-line';
import { PageOfSaleAggregate } from '../models/page-of-sale-aggregate';
import { PageOfStockEntry } from '../models/page-of-stock-entry';
import { PageOfAuxItem } from '../models/page-of-aux-item';
import { AuxItem } from '../models/aux-item';
import { AuxilaryLineItemDTO } from '../models/auxilary-line-item-dto';
import { PageOfAuxilaryOrderLine } from '../models/page-of-auxilary-order-line';
import { CategoryDTO } from '../models/category-dto';
import { PageOfComboItem } from '../models/page-of-combo-item';
import { ComboLineItemDTO } from '../models/combo-line-item-dto';
import { ContactDTO } from '../models/contact-dto';
import { CustomerDTO } from '../models/customer-dto';
import { Offer } from '../models/offer';
import { OfferLine } from '../models/offer-line';
import { TicketLineDTO } from '../models/ticket-line-dto';
import { PageOfOrder } from '../models/page-of-order';
import { OrderLine } from '../models/order-line';
import { Product } from '../models/product';
import { ProductDTO } from '../models/product-dto';
import { SaleDTO } from '../models/sale-dto';
import { StockEntryDTO } from '../models/stock-entry-dto';
import { UOMDTO } from '../models/uomdto';
import { PageOfUOM } from '../models/page-of-uom';
import { PageOfEntryLineItem } from '../models/page-of-entry-line-item';
import { PageOfSale } from '../models/page-of-sale';
import { PageOfAuxilaryLineItem } from '../models/page-of-auxilary-line-item';
import { ProductBundle } from '../models/product-bundle';
import { StockEntryBundle } from '../models/stock-entry-bundle';
import { StoreBundleDTO } from '../models/store-bundle-dto';
import { OpenTask } from '../models/open-task';
import { PageOfLocation } from '../models/page-of-location';
import { PageOfNotification } from '../models/page-of-notification';
import { Order } from '../models/order';
import { OrderMaster } from '../models/order-master';
import { ReportSummary } from '../models/report-summary';
import { PageOfReason } from '../models/page-of-reason';
import { PageOfBanner } from '../models/page-of-banner';
import { StoreDTO } from '../models/store-dto';
import { Store } from '../models/store';
import { UOM } from '../models/uom';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly getAllAuxilaryProductUsingGETPath = '/api/query/auxilary-products/{storeId}';
  static readonly findBannerUsingGETPath = '/api/query/banner/{id}';
  static readonly findCategoryByIdUsingGETPath = '/api/query/categorybyid/{id}';
  static readonly exportCustomersUsingGETPath = '/api/query/customers/export';
  static readonly findAllCategoriesByIdpCodeUsingGETPath = '/api/query/findAllCategoriesByIdpCode/{idpCode}';
  static readonly findAllCategoriesByNameAndIdpCodeUsingGETPath = '/api/query/findAllCategoriesByNameAndIdpCode/{name}/{idpCode}';
  static readonly findAllCategoryDTOsByIdpCodeUsingGETPath = '/api/query/findAllCategoryDTOsByIdpCode/{idpCode}';
  static readonly findAllCustomersUsingGETPath = '/api/query/findAllCustomers';
  static readonly findAllCustomersByNameUsingGETPath = '/api/query/findAllCustomersByName/{name}';
  static readonly findAllEntryLineItemsByIdpCodeUsingGETPath = '/api/query/findAllEntryLineItemsByIdpCode/{idpCode}';
  static readonly findAllOrderLinesByOrderIdUsingGETPath = '/api/query/findAllOrderLinesByOrderId/{orderId}';
  static readonly findAllProductByNameAndStoreIdUsingGETPath = '/api/query/findAllProductByNameAndStoreId/{name}/{storeId}';
  static readonly findAllProductsByIdpCodeUsingGETPath = '/api/query/findAllProductsByIdpCode/{idpCode}';
  static readonly findAllSaleAggregatesUsingGETPath = '/api/query/findAllSaleAggregates/combined/{storeId}';
  static readonly findAllStockEntriesByIdpcodeUsingGETPath = '/api/query/findAllStockEntriesByIdpCode/{idpCode}';
  static readonly findAuxItemByOrderLineIdUsingGETPath = '/api/query/findAuxItemByOrderLineId/{orderLineId}';
  static readonly findAuxItemsByIdUsingGETPath = '/api/query/findAuxItemsbyId/{id}';
  static readonly findAuxilaryLineItemByIdUsingGETPath = '/api/query/findAuxilaryLineItemById/{id}';
  static readonly findAuxilaryOrderLineByOrderLineIdUsingGETPath = '/api/query/findAuxilaryOrderLineByOrderLineId/{orderLineId}';
  static readonly findCategoryDTOByIdUsingGETPath = '/api/query/findCategoryDTOById/{id}';
  static readonly findComboItemByOrderLineIdUsingGETPath = '/api/query/findComboItemByOrderLineId/{orderLineId}';
  static readonly findCombolineItemByIdUsingGETPath = '/api/query/findCombolineItemById/{id}';
  static readonly findContactByIdUsingGETPath = '/api/query/findContactById/{id}';
  static readonly findCustomerByIdUsingGETPath = '/api/query/findCustomerById/{id}';
  static readonly findNotificationCountByReceiverIdAndStatusNameUsingGETPath = '/api/query/findNotificationCountByReceiverIdAndStatusName/{receiverId}/{status}';
  static readonly findOfferLinesByOrderIdUsingGETPath = '/api/query/findOfferLinesByOrderId/{orderId}';
  static readonly findOfferLinesByOrderNumberUsingGETPath = '/api/query/findOfferLinesByOrderNumber/{orderId}';
  static readonly findOneTicketLinesUsingGETPath = '/api/query/findOneTicketLines/{id}';
  static readonly findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETPath = '/api/query/findOrderByStatusNameAndStoreIdAndDeliveryType/{statusName}/{storeId}/{deliveryType}';
  static readonly findOrderLineByStoreIdUsingGETPath = '/api/query/findOrderLineByStoreId/{storeId}';
  static readonly findOrderLinesByOrderNumberUsingGETPath = '/api/query/findOrderLinesByOrderNumber/{orderId}';
  static readonly findProductByIdUsingGETPath = '/api/query/findProductById/{id}';
  static readonly findProductDTOByIdUsingGETPath = '/api/query/findProductDTOById/{id}';
  static readonly findSaleByIdUsingGETPath = '/api/query/findSaleById/{id}';
  static readonly findStockEntryByIdUsingGETPath = '/api/query/findStockEntryById/{id}';
  static readonly findUOMDTOByIdUsingGETPath = '/api/query/findUOMById/{id}';
  static readonly findUOMByIdpCodeUsingGETPath = '/api/query/findUOMByIdpCode/{idpCode}';
  static readonly findAllEntryLineItemsByStockEntryIdUsingGETPath = '/api/query/findallentrylineitems/{id}';
  static readonly findSalesUsingGETPath = '/api/query/findallsales/{storeId}';
  static readonly getAuxilaryLineItemsByIdpCodeUsingGETPath = '/api/query/getAuxilaryLineItemsByIdpCode/{idpCode}';
  static readonly getNotAuxNotComboProductsByIDPcodeUsingGETPath = '/api/query/getNotAuxNotComboProductsByIDPcode/{iDPcode}';
  static readonly getOrderDocketUsingGETPath = '/api/query/getOrderDocket/{orderNumber}';
  static readonly getProductBundleByIdUsingGETPath = '/api/query/getProductBundle/{id}';
  static readonly getStockEntryBundleByIdUsingGETPath = '/api/query/getStockEntryBundleById/{id}';
  static readonly getStoreBundleUsingGETPath = '/api/query/getStoreBundle/{regNo}';
  static readonly getTaskDetailsUsingGETPath = '/api/query/getTaskDetails/{taskName}/{orderId}/{storeId}';
  static readonly findLocationByRegNoUsingGETPath = '/api/query/location/{idpcode}';
  static readonly findNotificationByReceiverIdUsingGETPath = '/api/query/notification/{receiverId}';
  static readonly getNotificationCountByReceiveridAndStatusUsingGETPath = '/api/query/notification/{status}/{receiverId}';
  static readonly findOrderByOrderIdUsingGETPath = '/api/query/orderByOrderId/{orderId}';
  static readonly orderCountByCustomerIdAndStoreIdUsingGETPath = '/api/query/orderCountByCustomerIdAndStoreId/{customerId}/{storeId}';
  static readonly findOrderLineByOrderMasterIdUsingGETPath = '/api/query/orderLineByOrderMasterId/{orderMasterId}';
  static readonly findOrderMasterByOrderIdUsingGETPath = '/api/query/orderMasterByOrderId/{orderId}';
  static readonly getOrderSummaryUsingGETPath = '/api/query/ordersummary/{date}/{storeId}';
  static readonly createReportSummaryUsingGETPath = '/api/query/ordersummaryview/{expectedDelivery}/{storeName}';
  static readonly printSaleUsingGETPath = '/api/query/printSale/{saleId}/{idpCode}';
  static readonly findReasonByRegNoUsingGETPath = '/api/query/reason/{idpcode}';
  static readonly getAllCategoriesByIdpCodeUsingGETPath = '/api/query/report/getAllCategoriesByIdpCode/{idpcode}';
  static readonly getAllProductsByIdpCodeUsingGETPath = '/api/query/report/getAllProductsByIdpCode/{idpcode}';
  static readonly getCurrentStockByIdpCodeUsingGETPath = '/api/query/report/getCurrentStockByIdpCode/{idpcode}';
  static readonly findBannerByStoreIdUsingGETPath = '/api/query/store-banners/{storeId}';
  static readonly findStoreDTOByRegNoUsingGETPath = '/api/query/storeDTO/{regNo}';
  static readonly findStoreByRegNoUsingGETPath = '/api/query/stores/{regNo}';
  static readonly getTasksUsingGETPath = '/api/query/tasks';
  static readonly findAllTicketlinesUsingGETPath = '/api/query/ticket-lines';
  static readonly findUOMByIdUsingGETPath = '/api/query/uombyid/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `QueryResourceService.GetAllAuxilaryProductUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAllAuxilaryProductUsingGETResponse(params: QueryResourceService.GetAllAuxilaryProductUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/auxilary-products/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfProduct>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetAllAuxilaryProductUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAllAuxilaryProductUsingGET(params: QueryResourceService.GetAllAuxilaryProductUsingGETParams): __Observable<PageOfProduct> {
    return this.getAllAuxilaryProductUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findBannerUsingGETResponse(id: number): __Observable<__StrictHttpResponse<BannerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/banner/${id}`,
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
   * @param id id
   * @return OK
   */
  findBannerUsingGET(id: number): __Observable<BannerDTO> {
    return this.findBannerUsingGETResponse(id).pipe(
      __map(_r => _r.body as BannerDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findCategoryByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/categorybyid/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Category>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findCategoryByIdUsingGET(id: number): __Observable<Category> {
    return this.findCategoryByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Category)
    );
  }

  /**
   * @return OK
   */
  exportCustomersUsingGETResponse(): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/customers/export`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PdfDTO>;
      })
    );
  }
  /**
   * @return OK
   */
  exportCustomersUsingGET(): __Observable<PdfDTO> {
    return this.exportCustomersUsingGETResponse().pipe(
      __map(_r => _r.body as PdfDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCategoriesByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCategoriesByIdpCodeUsingGETResponse(params: QueryResourceService.FindAllCategoriesByIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfCategory>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCategoriesByIdpCode/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCategory>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCategoriesByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCategoriesByIdpCodeUsingGET(params: QueryResourceService.FindAllCategoriesByIdpCodeUsingGETParams): __Observable<PageOfCategory> {
    return this.findAllCategoriesByIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCategory)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCategoriesByNameAndIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `name`: name
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCategoriesByNameAndIdpCodeUsingGETResponse(params: QueryResourceService.FindAllCategoriesByNameAndIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfCategory>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCategoriesByNameAndIdpCode/${params.name}/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCategory>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCategoriesByNameAndIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `name`: name
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCategoriesByNameAndIdpCodeUsingGET(params: QueryResourceService.FindAllCategoriesByNameAndIdpCodeUsingGETParams): __Observable<PageOfCategory> {
    return this.findAllCategoriesByNameAndIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCategory)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCategoryDTOsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCategoryDTOsByIdpCodeUsingGETResponse(params: QueryResourceService.FindAllCategoryDTOsByIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfCategoryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCategoryDTOsByIdpCode/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCategoryDTO>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCategoryDTOsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCategoryDTOsByIdpCodeUsingGET(params: QueryResourceService.FindAllCategoryDTOsByIdpCodeUsingGETParams): __Observable<PageOfCategoryDTO> {
    return this.findAllCategoryDTOsByIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCategoryDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCustomersUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersUsingGETResponse(params: QueryResourceService.FindAllCustomersUsingGETParams): __Observable<__StrictHttpResponse<PageOfCustomer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCustomers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCustomer>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCustomersUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersUsingGET(params: QueryResourceService.FindAllCustomersUsingGETParams): __Observable<PageOfCustomer> {
    return this.findAllCustomersUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCustomer)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCustomersByNameUsingGETParams` containing the following parameters:
   *
   * - `name`: name
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersByNameUsingGETResponse(params: QueryResourceService.FindAllCustomersByNameUsingGETParams): __Observable<__StrictHttpResponse<PageOfCustomer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCustomersByName/${params.name}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCustomer>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCustomersByNameUsingGETParams` containing the following parameters:
   *
   * - `name`: name
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersByNameUsingGET(params: QueryResourceService.FindAllCustomersByNameUsingGETParams): __Observable<PageOfCustomer> {
    return this.findAllCustomersByNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCustomer)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllEntryLineItemsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllEntryLineItemsByIdpCodeUsingGETResponse(params: QueryResourceService.FindAllEntryLineItemsByIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<Array<EntryLineItem>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllEntryLineItemsByIdpCode/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<EntryLineItem>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllEntryLineItemsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllEntryLineItemsByIdpCodeUsingGET(params: QueryResourceService.FindAllEntryLineItemsByIdpCodeUsingGETParams): __Observable<Array<EntryLineItem>> {
    return this.findAllEntryLineItemsByIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<EntryLineItem>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllOrderLinesByOrderIdUsingGETParams` containing the following parameters:
   *
   * - `orderId`: orderId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllOrderLinesByOrderIdUsingGETResponse(params: QueryResourceService.FindAllOrderLinesByOrderIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfOrderLine>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllOrderLinesByOrderId/${params.orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfOrderLine>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllOrderLinesByOrderIdUsingGETParams` containing the following parameters:
   *
   * - `orderId`: orderId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllOrderLinesByOrderIdUsingGET(params: QueryResourceService.FindAllOrderLinesByOrderIdUsingGETParams): __Observable<PageOfOrderLine> {
    return this.findAllOrderLinesByOrderIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfOrderLine)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductByNameAndStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductByNameAndStoreIdUsingGETResponse(params: QueryResourceService.FindAllProductByNameAndStoreIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllProductByNameAndStoreId/${params.name}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfProduct>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllProductByNameAndStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductByNameAndStoreIdUsingGET(params: QueryResourceService.FindAllProductByNameAndStoreIdUsingGETParams): __Observable<PageOfProduct> {
    return this.findAllProductByNameAndStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductsByIdpCodeUsingGETResponse(params: QueryResourceService.FindAllProductsByIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllProductsByIdpCode/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfProduct>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllProductsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductsByIdpCodeUsingGET(params: QueryResourceService.FindAllProductsByIdpCodeUsingGETParams): __Observable<PageOfProduct> {
    return this.findAllProductsByIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllSaleAggregatesUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllSaleAggregatesUsingGETResponse(params: QueryResourceService.FindAllSaleAggregatesUsingGETParams): __Observable<__StrictHttpResponse<PageOfSaleAggregate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllSaleAggregates/combined/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfSaleAggregate>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllSaleAggregatesUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllSaleAggregatesUsingGET(params: QueryResourceService.FindAllSaleAggregatesUsingGETParams): __Observable<PageOfSaleAggregate> {
    return this.findAllSaleAggregatesUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfSaleAggregate)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStockEntriesByIdpcodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockEntriesByIdpcodeUsingGETResponse(params: QueryResourceService.FindAllStockEntriesByIdpcodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockEntry>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllStockEntriesByIdpCode/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStockEntry>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllStockEntriesByIdpcodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockEntriesByIdpcodeUsingGET(params: QueryResourceService.FindAllStockEntriesByIdpcodeUsingGETParams): __Observable<PageOfStockEntry> {
    return this.findAllStockEntriesByIdpcodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockEntry)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAuxItemByOrderLineIdUsingGETParams` containing the following parameters:
   *
   * - `orderLineId`: orderLineId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAuxItemByOrderLineIdUsingGETResponse(params: QueryResourceService.FindAuxItemByOrderLineIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfAuxItem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAuxItemByOrderLineId/${params.orderLineId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfAuxItem>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAuxItemByOrderLineIdUsingGETParams` containing the following parameters:
   *
   * - `orderLineId`: orderLineId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAuxItemByOrderLineIdUsingGET(params: QueryResourceService.FindAuxItemByOrderLineIdUsingGETParams): __Observable<PageOfAuxItem> {
    return this.findAuxItemByOrderLineIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfAuxItem)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findAuxItemsByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Array<AuxItem>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAuxItemsbyId/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AuxItem>>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findAuxItemsByIdUsingGET(id: number): __Observable<Array<AuxItem>> {
    return this.findAuxItemsByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Array<AuxItem>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findAuxilaryLineItemByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<AuxilaryLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAuxilaryLineItemById/${id}`,
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
   * @param id id
   * @return OK
   */
  findAuxilaryLineItemByIdUsingGET(id: number): __Observable<AuxilaryLineItemDTO> {
    return this.findAuxilaryLineItemByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as AuxilaryLineItemDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAuxilaryOrderLineByOrderLineIdUsingGETParams` containing the following parameters:
   *
   * - `orderLineId`: orderLineId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAuxilaryOrderLineByOrderLineIdUsingGETResponse(params: QueryResourceService.FindAuxilaryOrderLineByOrderLineIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfAuxilaryOrderLine>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAuxilaryOrderLineByOrderLineId/${params.orderLineId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfAuxilaryOrderLine>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAuxilaryOrderLineByOrderLineIdUsingGETParams` containing the following parameters:
   *
   * - `orderLineId`: orderLineId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAuxilaryOrderLineByOrderLineIdUsingGET(params: QueryResourceService.FindAuxilaryOrderLineByOrderLineIdUsingGETParams): __Observable<PageOfAuxilaryOrderLine> {
    return this.findAuxilaryOrderLineByOrderLineIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfAuxilaryOrderLine)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findCategoryDTOByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<CategoryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findCategoryDTOById/${id}`,
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
   * @param id id
   * @return OK
   */
  findCategoryDTOByIdUsingGET(id: number): __Observable<CategoryDTO> {
    return this.findCategoryDTOByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as CategoryDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindComboItemByOrderLineIdUsingGETParams` containing the following parameters:
   *
   * - `orderLineId`: orderLineId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findComboItemByOrderLineIdUsingGETResponse(params: QueryResourceService.FindComboItemByOrderLineIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfComboItem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findComboItemByOrderLineId/${params.orderLineId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfComboItem>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindComboItemByOrderLineIdUsingGETParams` containing the following parameters:
   *
   * - `orderLineId`: orderLineId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findComboItemByOrderLineIdUsingGET(params: QueryResourceService.FindComboItemByOrderLineIdUsingGETParams): __Observable<PageOfComboItem> {
    return this.findComboItemByOrderLineIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfComboItem)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findCombolineItemByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ComboLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findCombolineItemById/${id}`,
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
   * @param id id
   * @return OK
   */
  findCombolineItemByIdUsingGET(id: number): __Observable<ComboLineItemDTO> {
    return this.findCombolineItemByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ComboLineItemDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findContactByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ContactDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findContactById/${id}`,
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
   * @param id id
   * @return OK
   */
  findContactByIdUsingGET(id: number): __Observable<ContactDTO> {
    return this.findContactByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ContactDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findCustomerByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<CustomerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findCustomerById/${id}`,
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
   * @param id id
   * @return OK
   */
  findCustomerByIdUsingGET(id: number): __Observable<CustomerDTO> {
    return this.findCustomerByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as CustomerDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindNotificationCountByReceiverIdAndStatusNameUsingGETParams` containing the following parameters:
   *
   * - `status`: status
   *
   * - `receiverId`: receiverId
   *
   * @return OK
   */
  findNotificationCountByReceiverIdAndStatusNameUsingGETResponse(params: QueryResourceService.FindNotificationCountByReceiverIdAndStatusNameUsingGETParams): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.receiverId != null) __params = __params.set('receiverId', params.receiverId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findNotificationCountByReceiverIdAndStatusName/${params.receiverId}/${params.status}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindNotificationCountByReceiverIdAndStatusNameUsingGETParams` containing the following parameters:
   *
   * - `status`: status
   *
   * - `receiverId`: receiverId
   *
   * @return OK
   */
  findNotificationCountByReceiverIdAndStatusNameUsingGET(params: QueryResourceService.FindNotificationCountByReceiverIdAndStatusNameUsingGETParams): __Observable<number> {
    return this.findNotificationCountByReceiverIdAndStatusNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * @param orderId orderId
   * @return OK
   */
  findOfferLinesByOrderIdUsingGETResponse(orderId: number): __Observable<__StrictHttpResponse<Array<Offer>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findOfferLinesByOrderId/${orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Offer>>;
      })
    );
  }
  /**
   * @param orderId orderId
   * @return OK
   */
  findOfferLinesByOrderIdUsingGET(orderId: number): __Observable<Array<Offer>> {
    return this.findOfferLinesByOrderIdUsingGETResponse(orderId).pipe(
      __map(_r => _r.body as Array<Offer>)
    );
  }

  /**
   * @param orderId orderId
   * @return OK
   */
  findOfferLinesByOrderNumberUsingGETResponse(orderId: string): __Observable<__StrictHttpResponse<Array<OfferLine>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findOfferLinesByOrderNumber/${orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OfferLine>>;
      })
    );
  }
  /**
   * @param orderId orderId
   * @return OK
   */
  findOfferLinesByOrderNumberUsingGET(orderId: string): __Observable<Array<OfferLine>> {
    return this.findOfferLinesByOrderNumberUsingGETResponse(orderId).pipe(
      __map(_r => _r.body as Array<OfferLine>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findOneTicketLinesUsingGETResponse(id: number): __Observable<__StrictHttpResponse<TicketLineDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findOneTicketLines/${id}`,
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
   * @param id id
   * @return OK
   */
  findOneTicketLinesUsingGET(id: number): __Observable<TicketLineDTO> {
    return this.findOneTicketLinesUsingGETResponse(id).pipe(
      __map(_r => _r.body as TicketLineDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `statusName`: statusName
   *
   * - `deliveryType`: deliveryType
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETResponse(params: QueryResourceService.FindOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETParams): __Observable<__StrictHttpResponse<PageOfOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findOrderByStatusNameAndStoreIdAndDeliveryType/${params.statusName}/${params.storeId}/${params.deliveryType}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfOrder>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `statusName`: statusName
   *
   * - `deliveryType`: deliveryType
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGET(params: QueryResourceService.FindOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETParams): __Observable<PageOfOrder> {
    return this.findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfOrder)
    );
  }

  /**
   * @param params The `QueryResourceService.FindOrderLineByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderLineByStoreIdUsingGETResponse(params: QueryResourceService.FindOrderLineByStoreIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findOrderLineByStoreId/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfOrder>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindOrderLineByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderLineByStoreIdUsingGET(params: QueryResourceService.FindOrderLineByStoreIdUsingGETParams): __Observable<PageOfOrder> {
    return this.findOrderLineByStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfOrder)
    );
  }

  /**
   * @param orderId orderId
   * @return OK
   */
  findOrderLinesByOrderNumberUsingGETResponse(orderId: string): __Observable<__StrictHttpResponse<Array<OrderLine>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findOrderLinesByOrderNumber/${orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OrderLine>>;
      })
    );
  }
  /**
   * @param orderId orderId
   * @return OK
   */
  findOrderLinesByOrderNumberUsingGET(orderId: string): __Observable<Array<OrderLine>> {
    return this.findOrderLinesByOrderNumberUsingGETResponse(orderId).pipe(
      __map(_r => _r.body as Array<OrderLine>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findProductByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findProductById/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findProductByIdUsingGET(id: number): __Observable<Product> {
    return this.findProductByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findProductDTOByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ProductDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findProductDTOById/${id}`,
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
   * @param id id
   * @return OK
   */
  findProductDTOByIdUsingGET(id: number): __Observable<ProductDTO> {
    return this.findProductDTOByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ProductDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findSaleByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<SaleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findSaleById/${id}`,
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
   * @param id id
   * @return OK
   */
  findSaleByIdUsingGET(id: number): __Observable<SaleDTO> {
    return this.findSaleByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as SaleDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findStockEntryByIdUsingGETResponse(id?: number): __Observable<__StrictHttpResponse<StockEntryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockEntryById/${id}`,
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
   * @param id id
   * @return OK
   */
  findStockEntryByIdUsingGET(id?: number): __Observable<StockEntryDTO> {
    return this.findStockEntryByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as StockEntryDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findUOMDTOByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<UOMDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findUOMById/${id}`,
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
   * @param id id
   * @return OK
   */
  findUOMDTOByIdUsingGET(id: number): __Observable<UOMDTO> {
    return this.findUOMDTOByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as UOMDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindUOMByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findUOMByIdpCodeUsingGETResponse(params: QueryResourceService.FindUOMByIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfUOM>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findUOMByIdpCode/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfUOM>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindUOMByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findUOMByIdpCodeUsingGET(params: QueryResourceService.FindUOMByIdpCodeUsingGETParams): __Observable<PageOfUOM> {
    return this.findUOMByIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfUOM)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllEntryLineItemsByStockEntryIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllEntryLineItemsByStockEntryIdUsingGETResponse(params: QueryResourceService.FindAllEntryLineItemsByStockEntryIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfEntryLineItem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findallentrylineitems/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfEntryLineItem>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllEntryLineItemsByStockEntryIdUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllEntryLineItemsByStockEntryIdUsingGET(params: QueryResourceService.FindAllEntryLineItemsByStockEntryIdUsingGETParams): __Observable<PageOfEntryLineItem> {
    return this.findAllEntryLineItemsByStockEntryIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfEntryLineItem)
    );
  }

  /**
   * @param params The `QueryResourceService.FindSalesUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findSalesUsingGETResponse(params: QueryResourceService.FindSalesUsingGETParams): __Observable<__StrictHttpResponse<PageOfSale>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findallsales/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfSale>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindSalesUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findSalesUsingGET(params: QueryResourceService.FindSalesUsingGETParams): __Observable<PageOfSale> {
    return this.findSalesUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfSale)
    );
  }

  /**
   * @param params The `QueryResourceService.GetAuxilaryLineItemsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAuxilaryLineItemsByIdpCodeUsingGETResponse(params: QueryResourceService.GetAuxilaryLineItemsByIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfAuxilaryLineItem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getAuxilaryLineItemsByIdpCode/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfAuxilaryLineItem>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetAuxilaryLineItemsByIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `idpCode`: idpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAuxilaryLineItemsByIdpCodeUsingGET(params: QueryResourceService.GetAuxilaryLineItemsByIdpCodeUsingGETParams): __Observable<PageOfAuxilaryLineItem> {
    return this.getAuxilaryLineItemsByIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfAuxilaryLineItem)
    );
  }

  /**
   * @param params The `QueryResourceService.GetNotAuxNotComboProductsByIDPcodeUsingGETParams` containing the following parameters:
   *
   * - `iDPcode`: iDPcode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getNotAuxNotComboProductsByIDPcodeUsingGETResponse(params: QueryResourceService.GetNotAuxNotComboProductsByIDPcodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getNotAuxNotComboProductsByIDPcode/${params.iDPcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfProduct>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetNotAuxNotComboProductsByIDPcodeUsingGETParams` containing the following parameters:
   *
   * - `iDPcode`: iDPcode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getNotAuxNotComboProductsByIDPcodeUsingGET(params: QueryResourceService.GetNotAuxNotComboProductsByIDPcodeUsingGETParams): __Observable<PageOfProduct> {
    return this.getNotAuxNotComboProductsByIDPcodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param orderNumber orderNumber
   * @return OK
   */
  getOrderDocketUsingGETResponse(orderNumber: string): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getOrderDocket/${orderNumber}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PdfDTO>;
      })
    );
  }
  /**
   * @param orderNumber orderNumber
   * @return OK
   */
  getOrderDocketUsingGET(orderNumber: string): __Observable<PdfDTO> {
    return this.getOrderDocketUsingGETResponse(orderNumber).pipe(
      __map(_r => _r.body as PdfDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getProductBundleByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ProductBundle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getProductBundle/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductBundle>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getProductBundleByIdUsingGET(id: number): __Observable<ProductBundle> {
    return this.getProductBundleByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ProductBundle)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getStockEntryBundleByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<StockEntryBundle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getStockEntryBundleById/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockEntryBundle>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getStockEntryBundleByIdUsingGET(id: number): __Observable<StockEntryBundle> {
    return this.getStockEntryBundleByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as StockEntryBundle)
    );
  }

  /**
   * @param regNo regNo
   * @return OK
   */
  getStoreBundleUsingGETResponse(regNo: string): __Observable<__StrictHttpResponse<StoreBundleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getStoreBundle/${regNo}`,
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
   * @param regNo regNo
   * @return OK
   */
  getStoreBundleUsingGET(regNo: string): __Observable<StoreBundleDTO> {
    return this.getStoreBundleUsingGETResponse(regNo).pipe(
      __map(_r => _r.body as StoreBundleDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.GetTaskDetailsUsingGETParams` containing the following parameters:
   *
   * - `taskName`: taskName
   *
   * - `storeId`: storeId
   *
   * - `orderId`: orderId
   *
   * @return OK
   */
  getTaskDetailsUsingGETResponse(params: QueryResourceService.GetTaskDetailsUsingGETParams): __Observable<__StrictHttpResponse<OpenTask>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getTaskDetails/${params.taskName}/${params.orderId}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OpenTask>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetTaskDetailsUsingGETParams` containing the following parameters:
   *
   * - `taskName`: taskName
   *
   * - `storeId`: storeId
   *
   * - `orderId`: orderId
   *
   * @return OK
   */
  getTaskDetailsUsingGET(params: QueryResourceService.GetTaskDetailsUsingGETParams): __Observable<OpenTask> {
    return this.getTaskDetailsUsingGETResponse(params).pipe(
      __map(_r => _r.body as OpenTask)
    );
  }

  /**
   * @param params The `QueryResourceService.FindLocationByRegNoUsingGETParams` containing the following parameters:
   *
   * - `idpcode`: idpcode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findLocationByRegNoUsingGETResponse(params: QueryResourceService.FindLocationByRegNoUsingGETParams): __Observable<__StrictHttpResponse<PageOfLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/location/${params.idpcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfLocation>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindLocationByRegNoUsingGETParams` containing the following parameters:
   *
   * - `idpcode`: idpcode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findLocationByRegNoUsingGET(params: QueryResourceService.FindLocationByRegNoUsingGETParams): __Observable<PageOfLocation> {
    return this.findLocationByRegNoUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfLocation)
    );
  }

  /**
   * @param params The `QueryResourceService.FindNotificationByReceiverIdUsingGETParams` containing the following parameters:
   *
   * - `receiverId`: receiverId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findNotificationByReceiverIdUsingGETResponse(params: QueryResourceService.FindNotificationByReceiverIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfNotification>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/notification/${params.receiverId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfNotification>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindNotificationByReceiverIdUsingGETParams` containing the following parameters:
   *
   * - `receiverId`: receiverId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findNotificationByReceiverIdUsingGET(params: QueryResourceService.FindNotificationByReceiverIdUsingGETParams): __Observable<PageOfNotification> {
    return this.findNotificationByReceiverIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfNotification)
    );
  }

  /**
   * @param params The `QueryResourceService.GetNotificationCountByReceiveridAndStatusUsingGETParams` containing the following parameters:
   *
   * - `status`: status
   *
   * - `receiverId`: receiverId
   *
   * @return OK
   */
  getNotificationCountByReceiveridAndStatusUsingGETResponse(params: QueryResourceService.GetNotificationCountByReceiveridAndStatusUsingGETParams): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/notification/${params.status}/${params.receiverId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetNotificationCountByReceiveridAndStatusUsingGETParams` containing the following parameters:
   *
   * - `status`: status
   *
   * - `receiverId`: receiverId
   *
   * @return OK
   */
  getNotificationCountByReceiveridAndStatusUsingGET(params: QueryResourceService.GetNotificationCountByReceiveridAndStatusUsingGETParams): __Observable<number> {
    return this.getNotificationCountByReceiveridAndStatusUsingGETResponse(params).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * @param orderId orderId
   * @return OK
   */
  findOrderByOrderIdUsingGETResponse(orderId: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/orderByOrderId/${orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param orderId orderId
   * @return OK
   */
  findOrderByOrderIdUsingGET(orderId: string): __Observable<Order> {
    return this.findOrderByOrderIdUsingGETResponse(orderId).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param params The `QueryResourceService.OrderCountByCustomerIdAndStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `customerId`: customerId
   *
   * @return OK
   */
  orderCountByCustomerIdAndStoreIdUsingGETResponse(params: QueryResourceService.OrderCountByCustomerIdAndStoreIdUsingGETParams): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/orderCountByCustomerIdAndStoreId/${params.customerId}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * @param params The `QueryResourceService.OrderCountByCustomerIdAndStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `customerId`: customerId
   *
   * @return OK
   */
  orderCountByCustomerIdAndStoreIdUsingGET(params: QueryResourceService.OrderCountByCustomerIdAndStoreIdUsingGETParams): __Observable<number> {
    return this.orderCountByCustomerIdAndStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * @param params The `QueryResourceService.FindOrderLineByOrderMasterIdUsingGETParams` containing the following parameters:
   *
   * - `orderMasterId`: orderMasterId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderLineByOrderMasterIdUsingGETResponse(params: QueryResourceService.FindOrderLineByOrderMasterIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfOrderLine>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/orderLineByOrderMasterId/${params.orderMasterId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfOrderLine>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindOrderLineByOrderMasterIdUsingGETParams` containing the following parameters:
   *
   * - `orderMasterId`: orderMasterId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderLineByOrderMasterIdUsingGET(params: QueryResourceService.FindOrderLineByOrderMasterIdUsingGETParams): __Observable<PageOfOrderLine> {
    return this.findOrderLineByOrderMasterIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfOrderLine)
    );
  }

  /**
   * @param orderId orderId
   * @return OK
   */
  findOrderMasterByOrderIdUsingGETResponse(orderId: string): __Observable<__StrictHttpResponse<OrderMaster>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/orderMasterByOrderId/${orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderMaster>;
      })
    );
  }
  /**
   * @param orderId orderId
   * @return OK
   */
  findOrderMasterByOrderIdUsingGET(orderId: string): __Observable<OrderMaster> {
    return this.findOrderMasterByOrderIdUsingGETResponse(orderId).pipe(
      __map(_r => _r.body as OrderMaster)
    );
  }

  /**
   * @param params The `QueryResourceService.GetOrderSummaryUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `date`: date
   *
   * @return OK
   */
  getOrderSummaryUsingGETResponse(params: QueryResourceService.GetOrderSummaryUsingGETParams): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ordersummary/${params.date}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PdfDTO>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetOrderSummaryUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `date`: date
   *
   * @return OK
   */
  getOrderSummaryUsingGET(params: QueryResourceService.GetOrderSummaryUsingGETParams): __Observable<PdfDTO> {
    return this.getOrderSummaryUsingGETResponse(params).pipe(
      __map(_r => _r.body as PdfDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.CreateReportSummaryUsingGETParams` containing the following parameters:
   *
   * - `storeName`: storeName
   *
   * - `expectedDelivery`: expectedDelivery
   *
   * @return OK
   */
  createReportSummaryUsingGETResponse(params: QueryResourceService.CreateReportSummaryUsingGETParams): __Observable<__StrictHttpResponse<ReportSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ordersummaryview/${params.expectedDelivery}/${params.storeName}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReportSummary>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.CreateReportSummaryUsingGETParams` containing the following parameters:
   *
   * - `storeName`: storeName
   *
   * - `expectedDelivery`: expectedDelivery
   *
   * @return OK
   */
  createReportSummaryUsingGET(params: QueryResourceService.CreateReportSummaryUsingGETParams): __Observable<ReportSummary> {
    return this.createReportSummaryUsingGETResponse(params).pipe(
      __map(_r => _r.body as ReportSummary)
    );
  }

  /**
   * @param params The `QueryResourceService.PrintSaleUsingGETParams` containing the following parameters:
   *
   * - `saleId`: saleId
   *
   * - `idpCode`: idpCode
   *
   * @return OK
   */
  printSaleUsingGETResponse(params: QueryResourceService.PrintSaleUsingGETParams): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/printSale/${params.saleId}/${params.idpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PdfDTO>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.PrintSaleUsingGETParams` containing the following parameters:
   *
   * - `saleId`: saleId
   *
   * - `idpCode`: idpCode
   *
   * @return OK
   */
  printSaleUsingGET(params: QueryResourceService.PrintSaleUsingGETParams): __Observable<PdfDTO> {
    return this.printSaleUsingGETResponse(params).pipe(
      __map(_r => _r.body as PdfDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindReasonByRegNoUsingGETParams` containing the following parameters:
   *
   * - `idpcode`: idpcode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findReasonByRegNoUsingGETResponse(params: QueryResourceService.FindReasonByRegNoUsingGETParams): __Observable<__StrictHttpResponse<PageOfReason>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/reason/${params.idpcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfReason>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindReasonByRegNoUsingGETParams` containing the following parameters:
   *
   * - `idpcode`: idpcode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findReasonByRegNoUsingGET(params: QueryResourceService.FindReasonByRegNoUsingGETParams): __Observable<PageOfReason> {
    return this.findReasonByRegNoUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfReason)
    );
  }

  /**
   * @param idpcode idpcode
   * @return OK
   */
  getAllCategoriesByIdpCodeUsingGETResponse(idpcode: string): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/report/getAllCategoriesByIdpCode/${idpcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PdfDTO>;
      })
    );
  }
  /**
   * @param idpcode idpcode
   * @return OK
   */
  getAllCategoriesByIdpCodeUsingGET(idpcode: string): __Observable<PdfDTO> {
    return this.getAllCategoriesByIdpCodeUsingGETResponse(idpcode).pipe(
      __map(_r => _r.body as PdfDTO)
    );
  }

  /**
   * @param idpcode idpcode
   * @return OK
   */
  getAllProductsByIdpCodeUsingGETResponse(idpcode: string): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/report/getAllProductsByIdpCode/${idpcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PdfDTO>;
      })
    );
  }
  /**
   * @param idpcode idpcode
   * @return OK
   */
  getAllProductsByIdpCodeUsingGET(idpcode: string): __Observable<PdfDTO> {
    return this.getAllProductsByIdpCodeUsingGETResponse(idpcode).pipe(
      __map(_r => _r.body as PdfDTO)
    );
  }

  /**
   * @param idpcode idpcode
   * @return OK
   */
  getCurrentStockByIdpCodeUsingGETResponse(idpcode: string): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/report/getCurrentStockByIdpCode/${idpcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PdfDTO>;
      })
    );
  }
  /**
   * @param idpcode idpcode
   * @return OK
   */
  getCurrentStockByIdpCodeUsingGET(idpcode: string): __Observable<PdfDTO> {
    return this.getCurrentStockByIdpCodeUsingGETResponse(idpcode).pipe(
      __map(_r => _r.body as PdfDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindBannerByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findBannerByStoreIdUsingGETResponse(params: QueryResourceService.FindBannerByStoreIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfBanner>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/store-banners/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfBanner>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindBannerByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findBannerByStoreIdUsingGET(params: QueryResourceService.FindBannerByStoreIdUsingGETParams): __Observable<PageOfBanner> {
    return this.findBannerByStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfBanner)
    );
  }

  /**
   * @param regNo regNo
   * @return OK
   */
  findStoreDTOByRegNoUsingGETResponse(regNo: string): __Observable<__StrictHttpResponse<StoreDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/storeDTO/${regNo}`,
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
   * @param regNo regNo
   * @return OK
   */
  findStoreDTOByRegNoUsingGET(regNo: string): __Observable<StoreDTO> {
    return this.findStoreDTOByRegNoUsingGETResponse(regNo).pipe(
      __map(_r => _r.body as StoreDTO)
    );
  }

  /**
   * @param regNo regNo
   * @return OK
   */
  findStoreByRegNoUsingGETResponse(regNo: string): __Observable<__StrictHttpResponse<Store>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stores/${regNo}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Store>;
      })
    );
  }
  /**
   * @param regNo regNo
   * @return OK
   */
  findStoreByRegNoUsingGET(regNo: string): __Observable<Store> {
    return this.findStoreByRegNoUsingGETResponse(regNo).pipe(
      __map(_r => _r.body as Store)
    );
  }

  /**
   * @param params The `QueryResourceService.GetTasksUsingGETParams` containing the following parameters:
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `createdOn`: createdOn
   *
   * - `createdBefore`: createdBefore
   *
   * - `createdAfter`: createdAfter
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * @return OK
   */
  getTasksUsingGETResponse(params: QueryResourceService.GetTasksUsingGETParams): __Observable<__StrictHttpResponse<Array<Order>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.nameLike != null) __params = __params.set('nameLike', params.nameLike.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.createdOn != null) __params = __params.set('createdOn', params.createdOn.toString());
    if (params.createdBefore != null) __params = __params.set('createdBefore', params.createdBefore.toString());
    if (params.createdAfter != null) __params = __params.set('createdAfter', params.createdAfter.toString());
    if (params.candidateUser != null) __params = __params.set('candidateUser', params.candidateUser.toString());
    if (params.candidateGroups != null) __params = __params.set('candidateGroups', params.candidateGroups.toString());
    if (params.candidateGroup != null) __params = __params.set('candidateGroup', params.candidateGroup.toString());
    if (params.assigneeLike != null) __params = __params.set('assigneeLike', params.assigneeLike.toString());
    if (params.assignee != null) __params = __params.set('assignee', params.assignee.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/tasks`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Order>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetTasksUsingGETParams` containing the following parameters:
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `createdOn`: createdOn
   *
   * - `createdBefore`: createdBefore
   *
   * - `createdAfter`: createdAfter
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * @return OK
   */
  getTasksUsingGET(params: QueryResourceService.GetTasksUsingGETParams): __Observable<Array<Order>> {
    return this.getTasksUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Order>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllTicketlinesUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllTicketlinesUsingGETResponse(params: QueryResourceService.FindAllTicketlinesUsingGETParams): __Observable<__StrictHttpResponse<Array<TicketLineDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ticket-lines`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TicketLineDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllTicketlinesUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllTicketlinesUsingGET(params: QueryResourceService.FindAllTicketlinesUsingGETParams): __Observable<Array<TicketLineDTO>> {
    return this.findAllTicketlinesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<TicketLineDTO>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findUOMByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<UOM>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/uombyid/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UOM>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findUOMByIdUsingGET(id: number): __Observable<UOM> {
    return this.findUOMByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as UOM)
    );
  }
}

module QueryResourceService {

  /**
   * Parameters for getAllAuxilaryProductUsingGET
   */
  export interface GetAllAuxilaryProductUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCategoriesByIdpCodeUsingGET
   */
  export interface FindAllCategoriesByIdpCodeUsingGETParams {

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCategoriesByNameAndIdpCodeUsingGET
   */
  export interface FindAllCategoriesByNameAndIdpCodeUsingGETParams {

    /**
     * name
     */
    name: string;

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCategoryDTOsByIdpCodeUsingGET
   */
  export interface FindAllCategoryDTOsByIdpCodeUsingGETParams {

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCustomersUsingGET
   */
  export interface FindAllCustomersUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCustomersByNameUsingGET
   */
  export interface FindAllCustomersByNameUsingGETParams {

    /**
     * name
     */
    name: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllEntryLineItemsByIdpCodeUsingGET
   */
  export interface FindAllEntryLineItemsByIdpCodeUsingGETParams {

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllOrderLinesByOrderIdUsingGET
   */
  export interface FindAllOrderLinesByOrderIdUsingGETParams {

    /**
     * orderId
     */
    orderId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllProductByNameAndStoreIdUsingGET
   */
  export interface FindAllProductByNameAndStoreIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * name
     */
    name: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllProductsByIdpCodeUsingGET
   */
  export interface FindAllProductsByIdpCodeUsingGETParams {

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllSaleAggregatesUsingGET
   */
  export interface FindAllSaleAggregatesUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllStockEntriesByIdpcodeUsingGET
   */
  export interface FindAllStockEntriesByIdpcodeUsingGETParams {

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAuxItemByOrderLineIdUsingGET
   */
  export interface FindAuxItemByOrderLineIdUsingGETParams {

    /**
     * orderLineId
     */
    orderLineId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAuxilaryOrderLineByOrderLineIdUsingGET
   */
  export interface FindAuxilaryOrderLineByOrderLineIdUsingGETParams {

    /**
     * orderLineId
     */
    orderLineId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findComboItemByOrderLineIdUsingGET
   */
  export interface FindComboItemByOrderLineIdUsingGETParams {

    /**
     * orderLineId
     */
    orderLineId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findNotificationCountByReceiverIdAndStatusNameUsingGET
   */
  export interface FindNotificationCountByReceiverIdAndStatusNameUsingGETParams {

    /**
     * status
     */
    status?: string;

    /**
     * receiverId
     */
    receiverId?: string;
  }

  /**
   * Parameters for findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGET
   */
  export interface FindOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * statusName
     */
    statusName: string;

    /**
     * deliveryType
     */
    deliveryType: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findOrderLineByStoreIdUsingGET
   */
  export interface FindOrderLineByStoreIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findUOMByIdpCodeUsingGET
   */
  export interface FindUOMByIdpCodeUsingGETParams {

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllEntryLineItemsByStockEntryIdUsingGET
   */
  export interface FindAllEntryLineItemsByStockEntryIdUsingGETParams {

    /**
     * id
     */
    id: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findSalesUsingGET
   */
  export interface FindSalesUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getAuxilaryLineItemsByIdpCodeUsingGET
   */
  export interface GetAuxilaryLineItemsByIdpCodeUsingGETParams {

    /**
     * idpCode
     */
    idpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getNotAuxNotComboProductsByIDPcodeUsingGET
   */
  export interface GetNotAuxNotComboProductsByIDPcodeUsingGETParams {

    /**
     * iDPcode
     */
    iDPcode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getTaskDetailsUsingGET
   */
  export interface GetTaskDetailsUsingGETParams {

    /**
     * taskName
     */
    taskName: string;

    /**
     * storeId
     */
    storeId: string;

    /**
     * orderId
     */
    orderId: string;
  }

  /**
   * Parameters for findLocationByRegNoUsingGET
   */
  export interface FindLocationByRegNoUsingGETParams {

    /**
     * idpcode
     */
    idpcode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findNotificationByReceiverIdUsingGET
   */
  export interface FindNotificationByReceiverIdUsingGETParams {

    /**
     * receiverId
     */
    receiverId: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getNotificationCountByReceiveridAndStatusUsingGET
   */
  export interface GetNotificationCountByReceiveridAndStatusUsingGETParams {

    /**
     * status
     */
    status: string;

    /**
     * receiverId
     */
    receiverId: string;
  }

  /**
   * Parameters for orderCountByCustomerIdAndStoreIdUsingGET
   */
  export interface OrderCountByCustomerIdAndStoreIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * customerId
     */
    customerId: string;
  }

  /**
   * Parameters for findOrderLineByOrderMasterIdUsingGET
   */
  export interface FindOrderLineByOrderMasterIdUsingGETParams {

    /**
     * orderMasterId
     */
    orderMasterId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getOrderSummaryUsingGET
   */
  export interface GetOrderSummaryUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * date
     */
    date: string;
  }

  /**
   * Parameters for createReportSummaryUsingGET
   */
  export interface CreateReportSummaryUsingGETParams {

    /**
     * storeName
     */
    storeName: string;

    /**
     * expectedDelivery
     */
    expectedDelivery: string;
  }

  /**
   * Parameters for printSaleUsingGET
   */
  export interface PrintSaleUsingGETParams {

    /**
     * saleId
     */
    saleId: number;

    /**
     * idpCode
     */
    idpCode: string;
  }

  /**
   * Parameters for findReasonByRegNoUsingGET
   */
  export interface FindReasonByRegNoUsingGETParams {

    /**
     * idpcode
     */
    idpcode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findBannerByStoreIdUsingGET
   */
  export interface FindBannerByStoreIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getTasksUsingGET
   */
  export interface GetTasksUsingGETParams {

    /**
     * nameLike
     */
    nameLike?: string;

    /**
     * name
     */
    name?: string;

    /**
     * createdOn
     */
    createdOn?: string;

    /**
     * createdBefore
     */
    createdBefore?: string;

    /**
     * createdAfter
     */
    createdAfter?: string;

    /**
     * candidateUser
     */
    candidateUser?: string;

    /**
     * candidateGroups
     */
    candidateGroups?: string;

    /**
     * candidateGroup
     */
    candidateGroup?: string;

    /**
     * assigneeLike
     */
    assigneeLike?: string;

    /**
     * assignee
     */
    assignee?: string;
  }

  /**
   * Parameters for findAllTicketlinesUsingGET
   */
  export interface FindAllTicketlinesUsingGETParams {

    /**
     * sort
     */
    sort?: Array<string>;

    /**
     * size
     */
    size?: number;

    /**
     * page
     */
    page?: number;
  }
}

export { QueryResourceService }
