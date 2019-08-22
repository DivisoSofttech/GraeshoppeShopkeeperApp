/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageOfUOM } from '../models/page-of-uom';
import { PageOfProduct } from '../models/page-of-product';
import { AuxilaryLineItemDTO } from '../models/auxilary-line-item-dto';
import { PageOfAuxilaryLineItem } from '../models/page-of-auxilary-line-item';
import { BannerDTO } from '../models/banner-dto';
import { CategoryDTO } from '../models/category-dto';
import { Category } from '../models/category';
import { ComboLineItemDTO } from '../models/combo-line-item-dto';
import { ContactDTO } from '../models/contact-dto';
import { PdfDTO } from '../models/pdf-dto';
import { CustomerDTO } from '../models/customer-dto';
import { Type } from '../models/type';
import { EntryLineItem } from '../models/entry-line-item';
import { PageOfCategory } from '../models/page-of-category';
import { PageOfCustomer } from '../models/page-of-customer';
import { PageOfStockCurrent } from '../models/page-of-stock-current';
import { StockCurrent } from '../models/stock-current';
import { StockCurrentDTO } from '../models/stock-current-dto';
import { StockEntry } from '../models/stock-entry';
import { PageOfNotification } from '../models/page-of-notification';
import { OrderMasterDTO } from '../models/order-master-dto';
import { PageOfOrder } from '../models/page-of-order';
import { Product } from '../models/product';
import { ProductBundle } from '../models/product-bundle';
import { ProductDTO } from '../models/product-dto';
import { PageOfSaleAggregate } from '../models/page-of-sale-aggregate';
import { SaleDTO } from '../models/sale-dto';
import { PageOfSale } from '../models/page-of-sale';
import { StockEntryDTO } from '../models/stock-entry-dto';
import { PageOfBanner } from '../models/page-of-banner';
import { StoreDTO } from '../models/store-dto';
import { StoreBundleDTO } from '../models/store-bundle-dto';
import { Store } from '../models/store';
import { Order } from '../models/order';
import { TicketLineDTO } from '../models/ticket-line-dto';
import { TicketLine } from '../models/ticket-line';
import { UOMDTO } from '../models/uomdto';
import { UOM } from '../models/uom';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly findUOMByIDPcodeUsingGETPath = '/api/query/UOM/{iDPcode}';
  static readonly getAllAuxilaryProductUsingGETPath = '/api/query/auxilary-products/{storeId}';
  static readonly findAuxilaryLineItemUsingGETPath = '/api/query/auxilaryitem/{id}';
  static readonly getAuxilaryLineItemsByStoreIdUsingGETPath = '/api/query/auxilarylineitems/{iDPcode}';
  static readonly findBannerUsingGETPath = '/api/query/banner/{id}';
  static readonly updateCategoryUsingPUT1Path = '/api/query/categories';
  static readonly findCategoryUsingGETPath = '/api/query/category/{id}';
  static readonly findCategoryByIdUsingGETPath = '/api/query/categorybyid/{id}';
  static readonly findCombolineItemUsingGETPath = '/api/query/combolineitem/{id}';
  static readonly findContactByIdUsingGETPath = '/api/query/contacts/{id}';
  static readonly exportCustomersUsingGETPath = '/api/query/customers/export';
  static readonly findCustomerByIdUsingGETPath = '/api/query/customers/{id}';
  static readonly findAllDeliveryTypesByStoreIdUsingGETPath = '/api/query/delivery-Types/{storeId}';
  static readonly findAllEntryLineItemsUsingGETPath = '/api/query/entryLineItem/{storeId}';
  static readonly exportOrderDocketUsingGETPath = '/api/query/exportDocket/{orderMasterId}';
  static readonly findAllCategoriesWithOutImageUsingGETPath = '/api/query/findAllCategoriesWithOutImage/{iDPcode}';
  static readonly findAllCategoriesUsingGETPath = '/api/query/findAllCateogories/{storeId}';
  static readonly findAllCustomersUsingGETPath = '/api/query/findAllCustomer/{searchTerm}';
  static readonly findAllCustomersWithoutSearchUsingGETPath = '/api/query/findAllCustomers';
  static readonly findAllProductsByCategoryIdUsingGETPath = '/api/query/findAllProductByCategoryId/{categoryId}/{storeId}';
  static readonly findAllProductsUsingGETPath = '/api/query/findAllProducts/{iDPcode}';
  static readonly findAllStockCurrentByProductNameUsingGETPath = '/api/query/findAllStockCurrentByProductName/{name}/{storeId}';
  static readonly findAllStockCurrentByCategoryUsingGETPath = '/api/query/findAllStockCurrentsByCategoryId/{categoryId}/{storeId}';
  static readonly findAllProductBySearchTermUsingGETPath = '/api/query/findProductBySearchTerm/{searchTerm}/{storeId}';
  static readonly findStockCurrentByProductIdUsingGETPath = '/api/query/findStockCurrentByProductId/{productId}/{storeId}';
  static readonly findStockCurrentDTOByProductIdUsingGETPath = '/api/query/findStockCurrentDTOByProductId/{productId}';
  static readonly findStockEntryByProductIdUsingGETPath = '/api/query/findStockEntryByProductId/{productId}/{storeId}';
  static readonly getOrderDocketUsingGETPath = '/api/query/getOrderDocket/{orderMasterId}';
  static readonly getNotAuxNotComboProductsByIDPcodeUsingGETPath = '/api/query/not-aux-combo-products/{iDPcode}';
  static readonly findNotificationByReceiverIdUsingGETPath = '/api/query/notification/{receiverId}';
  static readonly findOrderMasterByOrderIdUsingGETPath = '/api/query/orderMaster/{orderId}/{status}';
  static readonly findOrderByStatusNameUsingGETPath = '/api/query/orderStatus/{statusName}';
  static readonly findOrderLineByStoreIdUsingGETPath = '/api/query/ordersbystoreId/{storeId}';
  static readonly findProductByIdUsingGETPath = '/api/query/product/{id}';
  static readonly getProductBundleUsingGETPath = '/api/query/productBundle/{id}';
  static readonly findAllProductUsingGETPath = '/api/query/productByStoreId/{iDPcode}';
  static readonly findProductUsingGETPath = '/api/query/products/{id}';
  static readonly findAllSaleAggregatesUsingGETPath = '/api/query/sales/combined/{storeId}';
  static readonly findSaleByIdUsingGETPath = '/api/query/sales/{id}';
  static readonly findSalesUsingGETPath = '/api/query/sales/{storeId}';
  static readonly searchStockCurrentsUsingGETPath = '/api/query/stock-current/{searchTerm}';
  static readonly findOneStockCurrentUsingGETPath = '/api/query/stock-currents/{id}';
  static readonly findOneStockEntryUsingGETPath = '/api/query/stock-entries/{id}';
  static readonly findAllStockDiariesUsingGETPath = '/api/query/stock-entries/{storeId}';
  static readonly getAllStockCurrentsByIDPcodeUsingGETPath = '/api/query/stockcurrentByIDPcode/{iDPcode}';
  static readonly findBannerByStoreIdUsingGETPath = '/api/query/store-banners/{storeId}';
  static readonly findStoreUsingGETPath = '/api/query/store/{id}';
  static readonly getStoreBundleUsingGETPath = '/api/query/storeBundle/{regNo}';
  static readonly findStoreDTOByRegNoUsingGETPath = '/api/query/storeDTO/{regNo}';
  static readonly findStoreByRegNoUsingGETPath = '/api/query/stores/{regNo}';
  static readonly getTasksUsingGETPath = '/api/query/tasks';
  static readonly findAllTicketlinesUsingGETPath = '/api/query/ticket-lines';
  static readonly findOneTicketLinesUsingGETPath = '/api/query/ticket-lines/{id}';
  static readonly findAllTicketLinesBySaleIdUsingGETPath = '/api/query/ticket-lines/{saleId}';
  static readonly findUOMUsingGETPath = '/api/query/uom/{id}';
  static readonly findUOMByIdUsingGETPath = '/api/query/uombyid/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `QueryResourceService.FindUOMByIDPcodeUsingGETParams` containing the following parameters:
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
  findUOMByIDPcodeUsingGETResponse(params: QueryResourceService.FindUOMByIDPcodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfUOM>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/UOM/${params.iDPcode}`,
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
   * @param params The `QueryResourceService.FindUOMByIDPcodeUsingGETParams` containing the following parameters:
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
  findUOMByIDPcodeUsingGET(params: QueryResourceService.FindUOMByIDPcodeUsingGETParams): __Observable<PageOfUOM> {
    return this.findUOMByIDPcodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfUOM)
    );
  }

  /**
   * @param storeId storeId
   * @return OK
   */
  getAllAuxilaryProductUsingGETResponse(storeId: string): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/auxilary-products/${storeId}`,
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
   * @param storeId storeId
   * @return OK
   */
  getAllAuxilaryProductUsingGET(storeId: string): __Observable<PageOfProduct> {
    return this.getAllAuxilaryProductUsingGETResponse(storeId).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findAuxilaryLineItemUsingGETResponse(id: number): __Observable<__StrictHttpResponse<AuxilaryLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/auxilaryitem/${id}`,
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
  findAuxilaryLineItemUsingGET(id: number): __Observable<AuxilaryLineItemDTO> {
    return this.findAuxilaryLineItemUsingGETResponse(id).pipe(
      __map(_r => _r.body as AuxilaryLineItemDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.GetAuxilaryLineItemsByStoreIdUsingGETParams` containing the following parameters:
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
  getAuxilaryLineItemsByStoreIdUsingGETResponse(params: QueryResourceService.GetAuxilaryLineItemsByStoreIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfAuxilaryLineItem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/auxilarylineitems/${params.iDPcode}`,
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
   * @param params The `QueryResourceService.GetAuxilaryLineItemsByStoreIdUsingGETParams` containing the following parameters:
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
  getAuxilaryLineItemsByStoreIdUsingGET(params: QueryResourceService.GetAuxilaryLineItemsByStoreIdUsingGETParams): __Observable<PageOfAuxilaryLineItem> {
    return this.getAuxilaryLineItemsByStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfAuxilaryLineItem)
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
   * @param params The `QueryResourceService.UpdateCategoryUsingPUT1Params` containing the following parameters:
   *
   * - `name`:
   *
   * - `imageContentType`:
   *
   * - `image`:
   *
   * - `id`:
   *
   * - `description`:
   *
   * - `IDPcode`:
   *
   * @return OK
   */
  updateCategoryUsingPUT1Response(params: QueryResourceService.UpdateCategoryUsingPUT1Params): __Observable<__StrictHttpResponse<CategoryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.imageContentType != null) __params = __params.set('imageContentType', params.imageContentType.toString());
    if (params.image != null) __params = __params.set('image', params.image.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.IDPcode != null) __params = __params.set('IDPcode', params.IDPcode.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/query/categories`,
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
   * @param params The `QueryResourceService.UpdateCategoryUsingPUT1Params` containing the following parameters:
   *
   * - `name`:
   *
   * - `imageContentType`:
   *
   * - `image`:
   *
   * - `id`:
   *
   * - `description`:
   *
   * - `IDPcode`:
   *
   * @return OK
   */
  updateCategoryUsingPUT1(params: QueryResourceService.UpdateCategoryUsingPUT1Params): __Observable<CategoryDTO> {
    return this.updateCategoryUsingPUT1Response(params).pipe(
      __map(_r => _r.body as CategoryDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findCategoryUsingGETResponse(id: number): __Observable<__StrictHttpResponse<CategoryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/category/${id}`,
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
  findCategoryUsingGET(id: number): __Observable<CategoryDTO> {
    return this.findCategoryUsingGETResponse(id).pipe(
      __map(_r => _r.body as CategoryDTO)
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
   * @param id id
   * @return OK
   */
  findCombolineItemUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ComboLineItemDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/combolineitem/${id}`,
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
  findCombolineItemUsingGET(id: number): __Observable<ComboLineItemDTO> {
    return this.findCombolineItemUsingGETResponse(id).pipe(
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
      this.rootUrl + `/api/query/contacts/${id}`,
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
   * @param id id
   * @return OK
   */
  findCustomerByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<CustomerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/customers/${id}`,
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
   * @param storeId storeId
   * @return OK
   */
  findAllDeliveryTypesByStoreIdUsingGETResponse(storeId: string): __Observable<__StrictHttpResponse<Array<Type>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/delivery-Types/${storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Type>>;
      })
    );
  }
  /**
   * @param storeId storeId
   * @return OK
   */
  findAllDeliveryTypesByStoreIdUsingGET(storeId: string): __Observable<Array<Type>> {
    return this.findAllDeliveryTypesByStoreIdUsingGETResponse(storeId).pipe(
      __map(_r => _r.body as Array<Type>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllEntryLineItemsUsingGETParams` containing the following parameters:
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
  findAllEntryLineItemsUsingGETResponse(params: QueryResourceService.FindAllEntryLineItemsUsingGETParams): __Observable<__StrictHttpResponse<Array<EntryLineItem>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/entryLineItem/${params.storeId}`,
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
   * @param params The `QueryResourceService.FindAllEntryLineItemsUsingGETParams` containing the following parameters:
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
  findAllEntryLineItemsUsingGET(params: QueryResourceService.FindAllEntryLineItemsUsingGETParams): __Observable<Array<EntryLineItem>> {
    return this.findAllEntryLineItemsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<EntryLineItem>)
    );
  }

  /**
   * @param orderMasterId orderMasterId
   * @return OK
   */
  exportOrderDocketUsingGETResponse(orderMasterId: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/exportDocket/${orderMasterId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param orderMasterId orderMasterId
   * @return OK
   */
  exportOrderDocketUsingGET(orderMasterId: number): __Observable<string> {
    return this.exportOrderDocketUsingGETResponse(orderMasterId).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams` containing the following parameters:
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
  findAllCategoriesWithOutImageUsingGETResponse(params: QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams): __Observable<__StrictHttpResponse<Array<CategoryDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCategoriesWithOutImage/${params.iDPcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CategoryDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams` containing the following parameters:
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
  findAllCategoriesWithOutImageUsingGET(params: QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams): __Observable<Array<CategoryDTO>> {
    return this.findAllCategoriesWithOutImageUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<CategoryDTO>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCategoriesUsingGETParams` containing the following parameters:
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
  findAllCategoriesUsingGETResponse(params: QueryResourceService.FindAllCategoriesUsingGETParams): __Observable<__StrictHttpResponse<PageOfCategory>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCateogories/${params.storeId}`,
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
   * @param params The `QueryResourceService.FindAllCategoriesUsingGETParams` containing the following parameters:
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
  findAllCategoriesUsingGET(params: QueryResourceService.FindAllCategoriesUsingGETParams): __Observable<PageOfCategory> {
    return this.findAllCategoriesUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCategory)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCustomersUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `searchTerm`: searchTerm
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
      this.rootUrl + `/api/query/findAllCustomer/${params.searchTerm}`,
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
   * - `storeId`: storeId
   *
   * - `searchTerm`: searchTerm
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
   * @param params The `QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersWithoutSearchUsingGETResponse(params: QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams): __Observable<__StrictHttpResponse<PageOfCustomer>> {
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
   * @param params The `QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersWithoutSearchUsingGET(params: QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams): __Observable<PageOfCustomer> {
    return this.findAllCustomersWithoutSearchUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCustomer)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductsByCategoryIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `categoryId`: categoryId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductsByCategoryIdUsingGETResponse(params: QueryResourceService.FindAllProductsByCategoryIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllProductByCategoryId/${params.categoryId}/${params.storeId}`,
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
   * @param params The `QueryResourceService.FindAllProductsByCategoryIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `categoryId`: categoryId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductsByCategoryIdUsingGET(params: QueryResourceService.FindAllProductsByCategoryIdUsingGETParams): __Observable<PageOfProduct> {
    return this.findAllProductsByCategoryIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductsUsingGETParams` containing the following parameters:
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
  findAllProductsUsingGETResponse(params: QueryResourceService.FindAllProductsUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllProducts/${params.iDPcode}`,
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
   * @param params The `QueryResourceService.FindAllProductsUsingGETParams` containing the following parameters:
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
  findAllProductsUsingGET(params: QueryResourceService.FindAllProductsUsingGETParams): __Observable<PageOfProduct> {
    return this.findAllProductsUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStockCurrentByProductNameUsingGETParams` containing the following parameters:
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
  findAllStockCurrentByProductNameUsingGETResponse(params: QueryResourceService.FindAllStockCurrentByProductNameUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllStockCurrentByProductName/${params.name}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStockCurrent>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllStockCurrentByProductNameUsingGETParams` containing the following parameters:
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
  findAllStockCurrentByProductNameUsingGET(params: QueryResourceService.FindAllStockCurrentByProductNameUsingGETParams): __Observable<PageOfStockCurrent> {
    return this.findAllStockCurrentByProductNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockCurrent)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStockCurrentByCategoryUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `categoryId`: categoryId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockCurrentByCategoryUsingGETResponse(params: QueryResourceService.FindAllStockCurrentByCategoryUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllStockCurrentsByCategoryId/${params.categoryId}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStockCurrent>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllStockCurrentByCategoryUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `categoryId`: categoryId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockCurrentByCategoryUsingGET(params: QueryResourceService.FindAllStockCurrentByCategoryUsingGETParams): __Observable<PageOfStockCurrent> {
    return this.findAllStockCurrentByCategoryUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockCurrent)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductBySearchTermUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductBySearchTermUsingGETResponse(params: QueryResourceService.FindAllProductBySearchTermUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findProductBySearchTerm/${params.searchTerm}/${params.storeId}`,
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
   * @param params The `QueryResourceService.FindAllProductBySearchTermUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductBySearchTermUsingGET(params: QueryResourceService.FindAllProductBySearchTermUsingGETParams): __Observable<PageOfProduct> {
    return this.findAllProductBySearchTermUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindStockCurrentByProductIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `productId`: productId
   *
   * @return OK
   */
  findStockCurrentByProductIdUsingGETResponse(params: QueryResourceService.FindStockCurrentByProductIdUsingGETParams): __Observable<__StrictHttpResponse<StockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockCurrentByProductId/${params.productId}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockCurrent>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindStockCurrentByProductIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `productId`: productId
   *
   * @return OK
   */
  findStockCurrentByProductIdUsingGET(params: QueryResourceService.FindStockCurrentByProductIdUsingGETParams): __Observable<StockCurrent> {
    return this.findStockCurrentByProductIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as StockCurrent)
    );
  }

  /**
   * @param productId productId
   * @return OK
   */
  findStockCurrentDTOByProductIdUsingGETResponse(productId: number): __Observable<__StrictHttpResponse<StockCurrentDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockCurrentDTOByProductId/${productId}`,
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
   * @param productId productId
   * @return OK
   */
  findStockCurrentDTOByProductIdUsingGET(productId: number): __Observable<StockCurrentDTO> {
    return this.findStockCurrentDTOByProductIdUsingGETResponse(productId).pipe(
      __map(_r => _r.body as StockCurrentDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindStockEntryByProductIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `productId`: productId
   *
   * @return OK
   */
  findStockEntryByProductIdUsingGETResponse(params: QueryResourceService.FindStockEntryByProductIdUsingGETParams): __Observable<__StrictHttpResponse<StockEntry>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockEntryByProductId/${params.productId}/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockEntry>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindStockEntryByProductIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `productId`: productId
   *
   * @return OK
   */
  findStockEntryByProductIdUsingGET(params: QueryResourceService.FindStockEntryByProductIdUsingGETParams): __Observable<StockEntry> {
    return this.findStockEntryByProductIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as StockEntry)
    );
  }

  /**
   * @param orderMasterId orderMasterId
   * @return OK
   */
  getOrderDocketUsingGETResponse(orderMasterId: number): __Observable<__StrictHttpResponse<PdfDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getOrderDocket/${orderMasterId}`,
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
   * @param orderMasterId orderMasterId
   * @return OK
   */
  getOrderDocketUsingGET(orderMasterId: number): __Observable<PdfDTO> {
    return this.getOrderDocketUsingGETResponse(orderMasterId).pipe(
      __map(_r => _r.body as PdfDTO)
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
      this.rootUrl + `/api/query/not-aux-combo-products/${params.iDPcode}`,
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
   * @param params The `QueryResourceService.FindOrderMasterByOrderIdUsingGETParams` containing the following parameters:
   *
   * - `status`: status
   *
   * - `orderId`: orderId
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findOrderMasterByOrderIdUsingGETResponse(params: QueryResourceService.FindOrderMasterByOrderIdUsingGETParams): __Observable<__StrictHttpResponse<OrderMasterDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/orderMaster/${params.orderId}/${params.status}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderMasterDTO>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindOrderMasterByOrderIdUsingGETParams` containing the following parameters:
   *
   * - `status`: status
   *
   * - `orderId`: orderId
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findOrderMasterByOrderIdUsingGET(params: QueryResourceService.FindOrderMasterByOrderIdUsingGETParams): __Observable<OrderMasterDTO> {
    return this.findOrderMasterByOrderIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as OrderMasterDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindOrderByStatusNameUsingGETParams` containing the following parameters:
   *
   * - `statusName`: statusName
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderByStatusNameUsingGETResponse(params: QueryResourceService.FindOrderByStatusNameUsingGETParams): __Observable<__StrictHttpResponse<PageOfOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/orderStatus/${params.statusName}`,
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
   * @param params The `QueryResourceService.FindOrderByStatusNameUsingGETParams` containing the following parameters:
   *
   * - `statusName`: statusName
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrderByStatusNameUsingGET(params: QueryResourceService.FindOrderByStatusNameUsingGETParams): __Observable<PageOfOrder> {
    return this.findOrderByStatusNameUsingGETResponse(params).pipe(
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
      this.rootUrl + `/api/query/ordersbystoreId/${params.storeId}`,
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
   * @param id id
   * @return OK
   */
  findProductByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/product/${id}`,
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
  getProductBundleUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ProductBundle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/productBundle/${id}`,
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
  getProductBundleUsingGET(id: number): __Observable<ProductBundle> {
    return this.getProductBundleUsingGETResponse(id).pipe(
      __map(_r => _r.body as ProductBundle)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductUsingGETParams` containing the following parameters:
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
  findAllProductUsingGETResponse(params: QueryResourceService.FindAllProductUsingGETParams): __Observable<__StrictHttpResponse<Array<ProductDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/productByStoreId/${params.iDPcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProductDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllProductUsingGETParams` containing the following parameters:
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
  findAllProductUsingGET(params: QueryResourceService.FindAllProductUsingGETParams): __Observable<Array<ProductDTO>> {
    return this.findAllProductUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<ProductDTO>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findProductUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ProductDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/products/${id}`,
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
  findProductUsingGET(id: number): __Observable<ProductDTO> {
    return this.findProductUsingGETResponse(id).pipe(
      __map(_r => _r.body as ProductDTO)
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
      this.rootUrl + `/api/query/sales/combined/${params.storeId}`,
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
   * @param id id
   * @return OK
   */
  findSaleByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<SaleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/sales/${id}`,
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
      this.rootUrl + `/api/query/sales/${params.storeId}`,
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
   * @param params The `QueryResourceService.SearchStockCurrentsUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  searchStockCurrentsUsingGETResponse(params: QueryResourceService.SearchStockCurrentsUsingGETParams): __Observable<__StrictHttpResponse<Array<StockCurrentDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-current/${params.searchTerm}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockCurrentDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.SearchStockCurrentsUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  searchStockCurrentsUsingGET(params: QueryResourceService.SearchStockCurrentsUsingGETParams): __Observable<Array<StockCurrentDTO>> {
    return this.searchStockCurrentsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockCurrentDTO>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findOneStockCurrentUsingGETResponse(id: number): __Observable<__StrictHttpResponse<StockCurrentDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-currents/${id}`,
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
   * @param id id
   * @return OK
   */
  findOneStockCurrentUsingGET(id: number): __Observable<StockCurrentDTO> {
    return this.findOneStockCurrentUsingGETResponse(id).pipe(
      __map(_r => _r.body as StockCurrentDTO)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findOneStockEntryUsingGETResponse(id: number): __Observable<__StrictHttpResponse<StockEntryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-entries/${id}`,
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
  findOneStockEntryUsingGET(id: number): __Observable<StockEntryDTO> {
    return this.findOneStockEntryUsingGETResponse(id).pipe(
      __map(_r => _r.body as StockEntryDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStockDiariesUsingGETParams` containing the following parameters:
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
  findAllStockDiariesUsingGETResponse(params: QueryResourceService.FindAllStockDiariesUsingGETParams): __Observable<__StrictHttpResponse<Array<StockEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-entries/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockEntry>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllStockDiariesUsingGETParams` containing the following parameters:
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
  findAllStockDiariesUsingGET(params: QueryResourceService.FindAllStockDiariesUsingGETParams): __Observable<Array<StockEntry>> {
    return this.findAllStockDiariesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockEntry>)
    );
  }

  /**
   * @param params The `QueryResourceService.GetAllStockCurrentsByIDPcodeUsingGETParams` containing the following parameters:
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
  getAllStockCurrentsByIDPcodeUsingGETResponse(params: QueryResourceService.GetAllStockCurrentsByIDPcodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stockcurrentByIDPcode/${params.iDPcode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStockCurrent>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetAllStockCurrentsByIDPcodeUsingGETParams` containing the following parameters:
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
  getAllStockCurrentsByIDPcodeUsingGET(params: QueryResourceService.GetAllStockCurrentsByIDPcodeUsingGETParams): __Observable<PageOfStockCurrent> {
    return this.getAllStockCurrentsByIDPcodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockCurrent)
    );
  }

  /**
   * @param storeId storeId
   * @return OK
   */
  findBannerByStoreIdUsingGETResponse(storeId: string): __Observable<__StrictHttpResponse<PageOfBanner>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/store-banners/${storeId}`,
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
   * @param storeId storeId
   * @return OK
   */
  findBannerByStoreIdUsingGET(storeId: string): __Observable<PageOfBanner> {
    return this.findBannerByStoreIdUsingGETResponse(storeId).pipe(
      __map(_r => _r.body as PageOfBanner)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findStoreUsingGETResponse(id: number): __Observable<__StrictHttpResponse<StoreDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/store/${id}`,
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
   * @param id id
   * @return OK
   */
  findStoreUsingGET(id: number): __Observable<StoreDTO> {
    return this.findStoreUsingGETResponse(id).pipe(
      __map(_r => _r.body as StoreDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.GetStoreBundleUsingGETParams` containing the following parameters:
   *
   * - `regNo`: regNo
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getStoreBundleUsingGETResponse(params: QueryResourceService.GetStoreBundleUsingGETParams): __Observable<__StrictHttpResponse<StoreBundleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/storeBundle/${params.regNo}`,
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
   * @param params The `QueryResourceService.GetStoreBundleUsingGETParams` containing the following parameters:
   *
   * - `regNo`: regNo
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getStoreBundleUsingGET(params: QueryResourceService.GetStoreBundleUsingGETParams): __Observable<StoreBundleDTO> {
    return this.getStoreBundleUsingGETResponse(params).pipe(
      __map(_r => _r.body as StoreBundleDTO)
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
  findOneTicketLinesUsingGETResponse(id: number): __Observable<__StrictHttpResponse<TicketLineDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ticket-lines/${id}`,
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
   * @param saleId saleId
   * @return OK
   */
  findAllTicketLinesBySaleIdUsingGETResponse(saleId: number): __Observable<__StrictHttpResponse<Array<TicketLine>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ticket-lines/${saleId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TicketLine>>;
      })
    );
  }
  /**
   * @param saleId saleId
   * @return OK
   */
  findAllTicketLinesBySaleIdUsingGET(saleId: number): __Observable<Array<TicketLine>> {
    return this.findAllTicketLinesBySaleIdUsingGETResponse(saleId).pipe(
      __map(_r => _r.body as Array<TicketLine>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findUOMUsingGETResponse(id: number): __Observable<__StrictHttpResponse<UOMDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/uom/${id}`,
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
  findUOMUsingGET(id: number): __Observable<UOMDTO> {
    return this.findUOMUsingGETResponse(id).pipe(
      __map(_r => _r.body as UOMDTO)
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
   * Parameters for findUOMByIDPcodeUsingGET
   */
  export interface FindUOMByIDPcodeUsingGETParams {

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
   * Parameters for getAuxilaryLineItemsByStoreIdUsingGET
   */
  export interface GetAuxilaryLineItemsByStoreIdUsingGETParams {

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
   * Parameters for updateCategoryUsingPUT1
   */
  export interface UpdateCategoryUsingPUT1Params {
    name?: string;
    imageContentType?: string;
    image?: string;
    id?: number;
    description?: string;
    IDPcode?: string;
  }

  /**
   * Parameters for findAllEntryLineItemsUsingGET
   */
  export interface FindAllEntryLineItemsUsingGETParams {

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
   * Parameters for findAllCategoriesWithOutImageUsingGET
   */
  export interface FindAllCategoriesWithOutImageUsingGETParams {

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
   * Parameters for findAllCategoriesUsingGET
   */
  export interface FindAllCategoriesUsingGETParams {

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
   * Parameters for findAllCustomersUsingGET
   */
  export interface FindAllCustomersUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * searchTerm
     */
    searchTerm: string;

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
   * Parameters for findAllCustomersWithoutSearchUsingGET
   */
  export interface FindAllCustomersWithoutSearchUsingGETParams {

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
   * Parameters for findAllProductsByCategoryIdUsingGET
   */
  export interface FindAllProductsByCategoryIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * categoryId
     */
    categoryId: number;

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
   * Parameters for findAllProductsUsingGET
   */
  export interface FindAllProductsUsingGETParams {

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
   * Parameters for findAllStockCurrentByProductNameUsingGET
   */
  export interface FindAllStockCurrentByProductNameUsingGETParams {

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
   * Parameters for findAllStockCurrentByCategoryUsingGET
   */
  export interface FindAllStockCurrentByCategoryUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * categoryId
     */
    categoryId: number;

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
   * Parameters for findAllProductBySearchTermUsingGET
   */
  export interface FindAllProductBySearchTermUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * searchTerm
     */
    searchTerm: string;

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
   * Parameters for findStockCurrentByProductIdUsingGET
   */
  export interface FindStockCurrentByProductIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * productId
     */
    productId: number;
  }

  /**
   * Parameters for findStockEntryByProductIdUsingGET
   */
  export interface FindStockEntryByProductIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * productId
     */
    productId: number;
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
   * Parameters for findOrderMasterByOrderIdUsingGET
   */
  export interface FindOrderMasterByOrderIdUsingGETParams {

    /**
     * status
     */
    status: string;

    /**
     * orderId
     */
    orderId: string;

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

  /**
   * Parameters for findOrderByStatusNameUsingGET
   */
  export interface FindOrderByStatusNameUsingGETParams {

    /**
     * statusName
     */
    statusName: string;

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
   * Parameters for findAllProductUsingGET
   */
  export interface FindAllProductUsingGETParams {

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
   * Parameters for searchStockCurrentsUsingGET
   */
  export interface SearchStockCurrentsUsingGETParams {

    /**
     * searchTerm
     */
    searchTerm: string;

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

  /**
   * Parameters for findAllStockDiariesUsingGET
   */
  export interface FindAllStockDiariesUsingGETParams {

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
   * Parameters for getAllStockCurrentsByIDPcodeUsingGET
   */
  export interface GetAllStockCurrentsByIDPcodeUsingGETParams {

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
   * Parameters for getStoreBundleUsingGET
   */
  export interface GetStoreBundleUsingGETParams {

    /**
     * regNo
     */
    regNo: string;

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
