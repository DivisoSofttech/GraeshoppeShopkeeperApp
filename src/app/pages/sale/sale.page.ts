import { PdfDTO } from './../../api/models/pdf-dto';
import { SaleHistoryComponent } from './../../components/sale-history/sale-history.component';
import { Customer } from './../../api/models/customer';
import { Util } from './../../services/util';
import { IonInfiniteScroll, IonSlides, ModalController, Platform } from '@ionic/angular';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Sale } from './../../api/models/sale';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketLine, Store, Product, TicketLineDTO, SaleDTO } from 'src/app/api/models';
import { CreateSelectCustomerComponent } from 'src/app/components/create-select-customer/create-select-customer.component';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

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
  salePdf: PdfDTO;
  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  loader: HTMLIonLoadingElement;

  constructor(
    private storage: Storage,
    private queryService: QueryResourceService,
    private util: Util,
    private commandResource: CommandResourceService,
    private modal: ModalController,
    private queryResource: QueryResourceService,
    private file: File,
    private fileOpener: FileOpener,
    private platform: Platform
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
      this.queryService.findAllProductsByIdpCodeUsingGET({idpCode:iDPcode})
      .subscribe(res => {
        this.infiniteScroll.complete();
        success !== undefined ? success(res) : null;

        console.log('Total Pages:' , res.totalPages , ' Total Element:' , res.totalElements);
        res.content.forEach(p => {
          this.queryService.getProductBundleByIdUsingGET(p.id)
              .subscribe(productBundle => {
                p.comboLineItems = productBundle.comboLineItems;
                p.auxilaryLineItems = productBundle.auxilaryLineItems;

              },err=>{
                console.log("error getting products",err)
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
    console.log("update sale");
    if(this.customer!=undefined){
    this.util.createLoader().then(loader => {
      loader.present();
      this.storage.get('user').then(user => {
        this.sale.customerId = this.customer.id;
        this.sale.idpCode = user.preferred_username;
        this.sale.grandTotal = this.totalPrice;
        this.sale.storeName = user.preferred_username;
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
          this.customer = {idpCode:'',imageLink:'',customerUniqueId:""};
          this.selectedProducts = [];
          this.ticketLines = [];
          this.totalPrice = 0;
          this.queryService.printSaleUsingGET({saleId: sale.id , idpCode: user.preferred_username}).subscribe(pdf => {
            this.salePdf = pdf;
            this.printSale(this.salePdf);
          });
          loader.dismiss();
        }, err => {
          loader.dismiss();
        });
      },
      err=>{
        console.log("error geting user",err);
        loader.dismiss();
      }
      );
    });
  }else{
  
    this.util.createToast('Pleace select Customer', 'information-circle');


  }
  }

  add(product: Product) {
    const containValue = this.ticketLines.find(tl => {
      return tl.productName === product.name;
    });
    if (containValue === undefined) {
      const ticketLine: TicketLineDTO = {};
      ticketLine.productName = product.name;
      ticketLine.quantity = 1;
      ticketLine.price = product.sellingPrice;
      ticketLine.total = product.sellingPrice;
      this.ticketLines.push(ticketLine);
      this.selectedProducts.push(product);
    } else {
      this.ticketLines.forEach(tl => {
        if (tl.productName === product.name) {
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
      return tl.productName === product.name;
    });
    if (containValue.quantity === 0) {
      this.ticketLines = this.ticketLines.filter(tl => tl.productName !== product.name);
      this.selectedProducts = this.selectedProducts.filter(sp => sp.id === product.id);
    } else if (containValue.quantity > 0) {
      this.ticketLines.forEach(tl => {
        if (tl.productName === product.name) {
          tl.quantity--;
          tl.total = tl.total - product.sellingPrice;
          this.getTotalPrice();
          if (tl.quantity < 1) {
            this.ticketLines = this.ticketLines.filter(tls => tls.productName !== product.name);
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
      return tl.productName === product.name;
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

  printSale(salePdf) {
    this.util.createLoader().then(loader => {
      loader.present();
        const byteCharacters = atob(salePdf.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: salePdf.contentType });
        console.log('blob is' + blob);
        if(this.platform.is('android'))
        {
          console.log("platform is android***********");
        this.fileCreation(blob, salePdf);
        }
        else{
          console.log("platform is browser***********");
          var pdfResult = salePdf.pdf;
          var dataURI = "data:application/pdf;base64," + pdfResult;
          var win = window.open();
          win.document.write('<iframe src="' + dataURI  + '"  style="position: absolute; height: 100%; border: none " ></iframe>');
        }
        loader.dismiss();
    });
  }

  fileCreation(blob, result) {
    const res = this.file.createFile(this.file.externalCacheDirectory, 'items.pdf', true);
    if (res !== undefined) {
        res
      .then(() => {
        console.log('file created' + blob);

        this.file
          .writeFile(this.file.externalCacheDirectory, 'items.pdf', blob, {
            replace: true
          })
          .then(value => {
            console.log('file writed' + value);
            this.fileOpener
              .showOpenWithDialog(
                this.file.externalCacheDirectory + 'items.pdf',
                result.contentType
              )
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', e));
            // this.documentViewer.viewDocument(this.file.externalCacheDirectory + 'items.pdf', 'application/pdf',
            // {print: {enabled: true}, openWith: {enabled: true}});
          });
      });
  }
      }

}
