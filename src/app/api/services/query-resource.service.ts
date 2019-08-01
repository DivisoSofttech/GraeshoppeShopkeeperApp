/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ContactDTO } from '../models/contact-dto';
import { PdfDTO } from '../models/pdf-dto';
import { CustomerDTO } from '../models/customer-dto';
import { EntryLineItem } from '../models/entry-line-item';
import { CategoryDTO } from '../models/category-dto';
import { PageOfCategory } from '../models/page-of-category';
import { PageOfCustomer } from '../models/page-of-customer';
import { PageOfProduct } from '../models/page-of-product';
import { PageOfStockCurrent } from '../models/page-of-stock-current';
import { UOMDTO } from '../models/uomdto';
import { StockCurrent } from '../models/stock-current';
import { StockCurrentDTO } from '../models/stock-current-dto';
import { StockEntry } from '../models/stock-entry';
import { PageOfOrder } from '../models/page-of-order';
import { ProductDTO } from '../models/product-dto';
import { Review } from '../models/review';
import { PageOfSaleAggregate } from '../models/page-of-sale-aggregate';
import { SaleDTO } from '../models/sale-dto';
import { PageOfSale } from '../models/page-of-sale';
import { StockEntryDTO } from '../models/stock-entry-dto';
import { StoreBundleDTO } from '../models/store-bundle-dto';
import { Store } from '../models/store';
import { TicketLineDTO } from '../models/ticket-line-dto';
import { TicketLine } from '../models/ticket-line';
import { UserRating } from '../models/user-rating';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly findContactByIdUsingGETPath = '/api/query/contacts/{id}';
  static readonly exportCustomersUsingGETPath = '/api/query/customers/export';
  static readonly findCustomerByIdUsingGETPath = '/api/query/customers/{id}';
  static readonly findAllEntryLineItemsUsingGETPath = '/api/query/entryLineItem/{storeId}';
  static readonly findAllCategoriesWithOutImageUsingGETPath = '/api/query/findAllCategoriesWithOutImage';
  static readonly findAllCategoriesUsingGETPath = '/api/query/findAllCateogories/{storeId}';
  static readonly findAllCustomersUsingGETPath = '/api/query/findAllCustomer/{searchTerm}';
  static readonly findAllCustomersWithoutSearchUsingGETPath = '/api/query/findAllCustomers';
  static readonly findAllProductsByCategoryIdUsingGETPath = '/api/query/findAllProductByCategoryId/{categoryId}/{storeId}';
  static readonly findAllProductsUsingGETPath = '/api/query/findAllProducts/{storeId}';
  static readonly findAllStockCurrentByProductNameUsingGETPath = '/api/query/findAllStockCurrentByProductName/{name}/{storeId}';
  static readonly findAllStockCurrentByCategoryUsingGETPath = '/api/query/findAllStockCurrentsByCategoryId/{categoryId}/{storeId}';
  static readonly findAllUomUsingGETPath = '/api/query/findAllUom';
  static readonly findAllProductBySearchTermUsingGETPath = '/api/query/findProductBySearchTerm/{searchTerm}/{storeId}';
  static readonly findStockCurrentByProductIdUsingGETPath = '/api/query/findStockCurrentByProductId/{productId}/{storeId}';
  static readonly findStockCurrentDTOByProductIdUsingGETPath = '/api/query/findStockCurrentDTOByProductId/{productId}';
  static readonly findStockEntryByProductIdUsingGETPath = '/api/query/findStockEntryByProductId/{productId}/{storeId}';
  static readonly findOrderLineByStoreIdUsingGETPath = '/api/query/ordersbystoreId/{storeId}';
  static readonly findAllProductUsingGETPath = '/api/query/productByStoreId/{storeId}';
  static readonly findProductUsingGETPath = '/api/query/products/{id}';
  static readonly findAllReviewsUsingGETPath = '/api/query/reviews';
  static readonly findAllSaleAggregatesUsingGETPath = '/api/query/sales/combined/{storeId}';
  static readonly findSaleByIdUsingGETPath = '/api/query/sales/{id}';
  static readonly findSalesUsingGETPath = '/api/query/sales/{storeId}';
  static readonly searchStockCurrentsUsingGETPath = '/api/query/stock-current/{searchTerm}';
  static readonly findOneStockCurrentUsingGETPath = '/api/query/stock-currents/{id}';
  static readonly findOneStockEntryUsingGETPath = '/api/query/stock-entries/{id}';
  static readonly findAllStockDiariesUsingGETPath = '/api/query/stock-entries/{storeId}';
  static readonly getAllStockCurrentsUsingGETPath = '/api/query/stockcurrentByStoreId/{storeId}';
  static readonly getStoreBundleUsingGETPath = '/api/query/storeBundle/{regNo}';
  static readonly findStoreByRegNoUsingGETPath = '/api/query/stores/{regNo}';
  static readonly findAllTicketlinesUsingGETPath = '/api/query/ticket-lines';
  static readonly findOneTicketLinesUsingGETPath = '/api/query/ticket-lines/{id}';
  static readonly findAllTicketLinesBySaleIdUsingGETPath = '/api/query/ticket-lines/{saleId}';
  static readonly findAllUserRatingsUsingGETPath = '/api/query/user-ratings';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
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
   * @param params The `QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams` containing the following parameters:
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
  findAllCategoriesWithOutImageUsingGETResponse(params: QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams): __Observable<__StrictHttpResponse<Array<CategoryDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCategoriesWithOutImage`,
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
  findAllProductsUsingGETResponse(params: QueryResourceService.FindAllProductsUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllProducts/${params.storeId}`,
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
   * @param params The `QueryResourceService.FindAllUomUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllUomUsingGETResponse(params: QueryResourceService.FindAllUomUsingGETParams): __Observable<__StrictHttpResponse<Array<UOMDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllUom`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UOMDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllUomUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllUomUsingGET(params: QueryResourceService.FindAllUomUsingGETParams): __Observable<Array<UOMDTO>> {
    return this.findAllUomUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<UOMDTO>)
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
   * @param params The `QueryResourceService.FindAllProductUsingGETParams` containing the following parameters:
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
  findAllProductUsingGETResponse(params: QueryResourceService.FindAllProductUsingGETParams): __Observable<__StrictHttpResponse<Array<ProductDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/productByStoreId/${params.storeId}`,
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
   * @param params The `QueryResourceService.FindAllReviewsUsingGETParams` containing the following parameters:
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
  findAllReviewsUsingGETResponse(params: QueryResourceService.FindAllReviewsUsingGETParams): __Observable<__StrictHttpResponse<Array<Review>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/reviews`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Review>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllReviewsUsingGETParams` containing the following parameters:
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
  findAllReviewsUsingGET(params: QueryResourceService.FindAllReviewsUsingGETParams): __Observable<Array<Review>> {
    return this.findAllReviewsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Review>)
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
   * @param params The `QueryResourceService.GetAllStockCurrentsUsingGETParams` containing the following parameters:
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
  getAllStockCurrentsUsingGETResponse(params: QueryResourceService.GetAllStockCurrentsUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stockcurrentByStoreId/${params.storeId}`,
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
   * @param params The `QueryResourceService.GetAllStockCurrentsUsingGETParams` containing the following parameters:
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
  getAllStockCurrentsUsingGET(params: QueryResourceService.GetAllStockCurrentsUsingGETParams): __Observable<PageOfStockCurrent> {
    return this.getAllStockCurrentsUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockCurrent)
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
   * @param params The `QueryResourceService.FindAllUserRatingsUsingGETParams` containing the following parameters:
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
  findAllUserRatingsUsingGETResponse(params: QueryResourceService.FindAllUserRatingsUsingGETParams): __Observable<__StrictHttpResponse<Array<UserRating>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/user-ratings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UserRating>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllUserRatingsUsingGETParams` containing the following parameters:
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
  findAllUserRatingsUsingGET(params: QueryResourceService.FindAllUserRatingsUsingGETParams): __Observable<Array<UserRating>> {
    return this.findAllUserRatingsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<UserRating>)
    );
  }
}

module QueryResourceService {

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
   * Parameters for findAllUomUsingGET
   */
  export interface FindAllUomUsingGETParams {

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
   * Parameters for findAllReviewsUsingGET
   */
  export interface FindAllReviewsUsingGETParams {

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
   * Parameters for getAllStockCurrentsUsingGET
   */
  export interface GetAllStockCurrentsUsingGETParams {

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

  /**
   * Parameters for findAllUserRatingsUsingGET
   */
  export interface FindAllUserRatingsUsingGETParams {

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
}

export { QueryResourceService }
