import { AddressDTO } from './../../api/models/address-dto';
import { filter } from 'rxjs/operators';
import { Address } from './../../api/models/address';
import { LocationDTO } from './../../api/models/location-dto';
import { StockEntryDTO } from './../../api/models/stock-entry-dto';
import { EntryLineItemDTO } from './../../api/models/entry-line-item-dto';
import { EntryLineItem } from './../../api/models/entry-line-item';
import { Product } from './../../api/models/product';
import { Util } from 'src/app/services/util';
import { ModalController, IonSlides, IonInfiniteScroll } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { ReasonDTO, Reason, Location } from 'src/app/api/models';

@Component({
  selector: 'app-create-edit-stock-dairy',
  templateUrl: './create-edit-stock-dairy.component.html',
  styleUrls: ['./create-edit-stock-dairy.component.scss'],
})
export class CreateEditStockDairyComponent implements OnInit {

  reasonDTO: ReasonDTO = {};
  reasons: Reason[] = [];
  locations: Location[] = [];
  locationDTO: LocationDTO = {};
  address: AddressDTO = {};
  stockEntry: StockEntryDTO = {};
  mode = 'create';
  pageCount = 0;
  reason = false;
  products: Product[] = [];
  location = false;
  loader: HTMLIonLoadingElement;
  currentSlide: string;
  showDetail = false;
  currentProduct: Product = {};
  entryLineItemDTO: EntryLineItemDTO = {};
  entryLineItems: EntryLineItemDTO[] = [];
  selectedProducts: Product[] = [];
  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private modal: ModalController,
    private queryService: QueryResourceService,
    private storage: Storage,
    private util: Util,
    private commandService: CommandResourceService
  ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      this.getProducts(0 , true);
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  toggleAddReason() {
    this.reason = !this.reason;
  }

  toggleAddLocation() {
    this.location = !this.location;
  }

  slide(value: string) {
    this.currentSlide = value;
    if (value === '1') {
      this.slides.slideTo(1);
    } else {
      this.slides.slideTo(0);
    }
  }



  getProducts(i , limit?: Boolean , success?) {

    let iDPcode;
    this.storage.get('user').then(user => {
      iDPcode = user.preferred_username;
      this.queryService.findAllProductsUsingGET({iDPcode, page: i})
      .subscribe(res => {
        this.infiniteScroll.complete();
        success != undefined ? success(res) : null;

        console.log('Total Pages:' , res.totalPages , ' Total Element:' , res.totalElements);
        res.content.forEach(p => {
          this.queryService.getProductBundleUsingGET(p.id)
              .subscribe(productBundle => {
                p.comboLineItems = productBundle.comboLineItems;
                p.auxilaryLineItems = productBundle.auxilaryLineItems;

              });
          this.products.push(p);
        });
        i++;
        if (i == res.totalPages) {
          this.toggleInfiniteScroll();
        }
        if (limit === false) {
          if (i < res.totalPages) {
            this.getProducts(i , limit);
          } else {
            this.loader.dismiss();
          }
        } else {
          this.loader.dismiss();
        }
      },
      err => {
        this.loader.dismiss();
      });
    })
    .catch(err => {
      console.log('Error Fetching user from storage');
      this.loader.dismiss();
    });
  }

  loadMoreProducts(event) {
    this.pageCount++;
    this.getProducts(this.pageCount , true , (data) => {

      // Disable infinite scroll if all pages have been loaded
      console.log(this.pageCount + 1, '==' , data.totalPages);
      if (data.totalPages === this.pageCount + 1) {
        console.log('InfiniteScroll Disabled'
        );
        event.target.disabled = true;
      }
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  toggleDetail(product) {
    this.currentProduct = product;
    this.showDetail = !this.showDetail;
  }

  addEntryLineItem() {
    this.entryLineItemDTO.productId = this.currentProduct.id;
    this.selectedProducts.push(this.currentProduct);
    this.entryLineItems.push(this.entryLineItemDTO);
  }

  removeStockEntry(product) {
    this.entryLineItems = this.entryLineItems.filter(e => e.productId != product.id);
    this.selectedProducts = this.selectedProducts.filter(sp => sp.id != product.id);
  }
  createReason() {
    this.commandService.createReasonUsingPOST(this.reasonDTO).subscribe(reasonDTO => {
      this.reasons.push(reasonDTO);
    });
  }

  createLocation() {
    this.commandService.createProductAddressUsingPOST(this.address).subscribe(address => {
      this.locationDTO.addressId = address.id;
      this.commandService.createLocationUsingPOST(this.locationDTO).subscribe(locationDTO => {
        this.locations.push(locationDTO);
      });
    });

  }

  getLocations() {

  }
  getReasons() {

  }
}
