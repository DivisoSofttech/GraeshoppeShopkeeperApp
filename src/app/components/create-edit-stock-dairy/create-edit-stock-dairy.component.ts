import { AddressDTO } from './../../api/models/address-dto';
import { filter } from 'rxjs/operators';
import { Address } from './../../api/models/address';
import { LocationDTO } from './../../api/models/location-dto';
import { StockEntryDTO } from './../../api/models/stock-entry-dto';
import { EntryLineItemDTO } from './../../api/models/entry-line-item-dto';
import { EntryLineItem } from './../../api/models/entry-line-item';
import { Product } from './../../api/models/product';
import { Util } from 'src/app/services/util';
import { ModalController, IonSlides, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
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

  @Input()edit = false;

  @ViewChild('content', {static: false}) content: IonContent;
  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private modal: ModalController,
    private queryService: QueryResourceService,
    private storage: Storage,
    private util: Util,
    private commandService: CommandResourceService,
  ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      this.getProducts(0 , true);
      this.getReasons();
      this.getLocations();
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
      this.content.scrollToTop(0);
    }
  }

  createStockEntry() {
    this.storage.get('user').then(user => {
      this.stockEntry.date = new Date().toISOString();
      this.stockEntry.iDPcode = user.preferred_username;
      this.commandService.createStockEntryUsingPOST(this.stockEntry).subscribe(stockEntry => {
      console.log('stock', stockEntry);
      this.entryLineItems.forEach(entryLineitem => {
        entryLineitem.stockEntryId = stockEntry.id;
        this.commandService.createEntryLineItemUsingPOST(entryLineitem).subscribe(entry => {
          console.log('entry', entry);
        }, err => {
          console.log('error', err);
        });
      });
    }, err => console.log('error creating stockentry'));
  });
  }

  updateStockEntry() {

  }

  getProducts(i , limit?: boolean , success?) {

    let iDPcode;
    this.storage.get('user').then(user => {
      iDPcode = user.preferred_username;
      this.queryService.findAllProductsUsingGET({iDPcode, page: i})
      .subscribe(res => {
        console.log('Total Pages:' , res.totalPages , ' Total Element:' , res.totalElements);
        res.content.forEach(p => {
          this.products.push(p);
        });
        i++;
        if (i === res.totalPages) {
          this.toggleInfiniteScroll();
        }
        this.loader.dismiss();
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
    console.log('page count', this.pageCount);
    this.pageCount++;
    this.getProducts(this.pageCount);
  }

  toggleInfiniteScroll() {
    console.log('in', this.infiniteScroll.disabled);
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
    this.showDetail = false;
  }

  removeStockEntry(product) {
    this.entryLineItems = this.entryLineItems.filter(e => e.productId !== product.id);
    this.selectedProducts = this.selectedProducts.filter(sp => sp.id !== product.id);
  }
  createReason() {
    this.storage.get('user').then(user => {
    this.reasonDTO.iDPcode = user.preferred_username;
    this.commandService.createReasonUsingPOST(this.reasonDTO).subscribe(reasonDTO => {
      this.reasons.push(reasonDTO);
      this.reason = false;
    });
  });
  }

  createLocation() {
    this.storage.get('user').then(user => {
    this.commandService.createProductAddressUsingPOST(this.address).subscribe(address => {
      this.locationDTO.iDPcode = user.preferred_username;
      this.locationDTO.addressId = address.id;
      this.commandService.createLocationUsingPOST(this.locationDTO).subscribe(locationDTO => {
        this.locations.push(locationDTO);
        this.location = false;
      });
    });
  });

  }

  getLocations() {
    this.storage.get('user').then(user => {
      this.queryService.findLocationByRegNoUsingGET(user.preferred_username).subscribe(page => {
        this.locations = page.content;
      });
    });
  }
  getReasons() {
    this.storage.get('user').then(user => {
      this.queryService.findReasonByRegNoUsingGET(user.preferred_username).subscribe(page => {
        this.reasons = page.content;
      });
    });
  }

  getEntryLineItems() {
    // this.queryService.findAllEntryLineItemsUsingGET()
  }

}
