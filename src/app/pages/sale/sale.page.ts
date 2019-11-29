import { SaleHistoryComponent } from './../../components/sale-history/sale-history.component';
import { Customer } from './../../api/models/customer';
import { Util } from './../../services/util';
import { IonInfiniteScroll, IonSlides, ModalController } from '@ionic/angular';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Sale } from './../../api/models/sale';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketLine, Store, Product, TicketLineDTO, SaleDTO } from 'src/app/api/models';
import { CreateSelectCustomerComponent } from 'src/app/components/create-select-customer/create-select-customer.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {
  store: Store = {
  	imageLink: '',
  	storeUniqueId: ''
  };
  sale: SaleDTO = {};
  ticketLines: TicketLineDTO[] = [];
  totalPrice = 0;
  products: Product[] = [] ;
  pageCount = 0;
  currentSlide = 0;
  selectedProducts: Product[] = [] ;
  customer: Customer;
  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  loader: HTMLIonLoadingElement;

  constructor(
    private storage: Storage,
    private queryService: QueryResourceService,
    private util: Util,
    private commandResource: CommandResourceService,
    private modal: ModalController
    ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      this.getProducts(0 , true);
    });
  }

  getProducts(i , limit?: boolean , success?) {

    let iDPcode;
    this.storage.get('user').then(user => {
      iDPcode = user.preferred_username;
      this.queryService.findAllProductsUsingGET({iDPcode, page: i})
      .subscribe(res => {
        this.infiniteScroll.complete();
        success !== undefined ? success(res) : null;

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
        if (i === res.totalPages) {
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


  slide(num) {
    this.currentSlide = num;
    this.slides.slideTo(num);
    this.getTotalPrice();
  }

  updateSale() {
    this.util.createLoader().then(loader => {
      loader.present();
      this.storage.get('user').then(user => {
        this.sale.customerId = this.customer.id;
        this.sale.userId = user.preferred_username;
        this.sale.grandTotal = this.totalPrice;
        this.commandResource.createSaleUsingPOST(this.sale).subscribe(sale => {
          console.log('sale', sale);
          this.ticketLines.forEach(tl => {
            tl.saleId = sale.id;
            this.commandResource.createTickerLineUsingPOST(tl).subscribe(data => {
              console.log('ticket', data);
            }, err => {
              loader.dismiss();
            });
          });
          loader.dismiss();
        }, err => {
          loader.dismiss();
        });
      });
    });
  }

  add(product: Product) {
    const containValue = this.ticketLines.find(tl => {
      return tl.productId === product.id;
    });
    if (containValue === undefined) {
      const ticketLine: TicketLineDTO = {};
      ticketLine.productId = product.id;
      ticketLine.quantity = 1;
      ticketLine.price = product.sellingPrice;
      ticketLine.total = product.sellingPrice;
      this.ticketLines.push(ticketLine);
      this.selectedProducts.push(product);
    } else {
      this.ticketLines.forEach(tl => {
        if (tl.productId === product.id) {
          tl.quantity++;
          tl.total = tl.total + product.sellingPrice;
          this.getTotalPrice();
        }
      });
    }
    console.log('sel', this.selectedProducts);
    console.log('contain', containValue);
    console.log('lineadd', this.ticketLines);
  }

  remove(product: Product) {
    const containValue = this.ticketLines.find(tl => {
      return tl.productId === product.id;
    });
    if (containValue.quantity === 0) {
      this.ticketLines = this.ticketLines.filter(tl => tl.productId !== product.id);
      this.selectedProducts = this.selectedProducts.filter(sp => sp.id === product.id);
    } else if (containValue.quantity > 0) {
      this.ticketLines.forEach(tl => {
        if (tl.productId === product.id) {
          tl.quantity--;
          tl.total = tl.total - product.sellingPrice;
          this.getTotalPrice();
          if (tl.quantity < 1) {
            this.ticketLines = this.ticketLines.filter(tls => tls.productId !== product.id);
            this.selectedProducts = this.selectedProducts.filter(sp => sp.id !== product.id);
          }
        }
      });
    }
    console.log('sel', this.selectedProducts);
    console.log('contain', containValue);
    console.log('lineremove', this.ticketLines);
  }

  getCount(product: Product): number {
    const containValue = this.ticketLines.find(tl => {
      return tl.productId === product.id;
    });
    if  (containValue === undefined) {
      return 0;
    }
    return containValue.quantity;
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.ticketLines.forEach(tl => {
      this.totalPrice = this.totalPrice + tl.total;
    });
  }

  async customerModal() {
    const modal = await this.modal.create({
      component: CreateSelectCustomerComponent
    });
    modal.present();

    modal.onDidDismiss().then(cus => {
      this.customer = cus.data;
    });
  }

  async saleHistoryModal() {
    const modal = await this.modal.create({
      component: SaleHistoryComponent
    });
    modal.present();
  }

}
