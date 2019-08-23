import { ProductViewComponent } from './../../components/product-view/product-view.component';

import { Storage } from '@ionic/storage';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from '../../api/services/query-resource.service';
import { Product } from '../../api/models/product';
import { Util } from 'src/app/services/util';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  loader: HTMLIonLoadingElement;
  searchTerm: string;
  pageCount = 0;
  showSearchbar: boolean = false;
  products: Product[] = [];
  tempProducts: Product[] =[];
  notificationCount: number;

  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll

  constructor(
    private storage: Storage,
    private util: Util,
    private queryService: QueryResourceService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      this.getNoticationCount();
      this.getProducts(0 , true);
      this.tempProducts = this.products;
    });
  }
  toggleSearchbar(){
    this.showSearchbar = !this.showSearchbar;
    // this.products = [];
    // this.tempProducts.forEach(tp => this.products.push(tp));
    this.products=this.tempProducts;
    console.log(this.products);
    
  }
  searchProducts(i){
    
    let storeId;
    this.storage.get('user').then(user => {
      storeId = user.preferred_username;
      this.queryService.findAllProductBySearchTermUsingGET({storeId,page: i,searchTerm: this.searchTerm})
          .subscribe(res => {
          this.products = [];
            res.content.forEach(p => {
              this.products.push(p);
            });
            i++;
            if(i < res.totalPages) {
              this.searchProducts(i);  
            } else {
              this.loader.dismiss();
            }
          });
    })
  }
  
  getProducts(i , limit?: Boolean , success?) {
    
    let iDPcode;
    this.storage.get('user').then(user => {
      iDPcode = user.preferred_username;
      this.queryService.findAllProductsUsingGET({iDPcode,page: i})
      .subscribe(res => {
        success != undefined?success(res):null;
        
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
        if(limit === false) {
          if(i < res.totalPages) {
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

  updateProduct(product) {
    console.log('product', product);
    this.queryService.findProductByIdUsingGET(product.id)
        .subscribe(product => {
          const productDomain: Product = product;
          const index = this.products.findIndex(p => p.id === product.id);
          this.products.splice(index, 1, productDomain);
        })
  }
  deleteProduct(product: Product) {
    this.products = this.products.filter(p => p !== product);
  }

  onAddProduct(product) {
    this.queryService.findProductByIdUsingGET(product.id)
        .subscribe(productDomain => this.products.push(productDomain))
  }
  
  //Infinite Scroll and refresh

  refresh(event) {
    this.products = [];
    this.pageCount = 0;
    this.infiniteScroll.disabled = false;
    this.getProducts(0 , true , ()=>{
      // Disable Refresh after Completion
      event.target.complete();
    });
  }

  loadMoreProducts(event) {
    this.pageCount++;
    this.getProducts(this.pageCount , true , (data)=>{

      // Disable infinite scroll if all pages have been loaded
      console.log(this.pageCount + 1,'==' , data.totalPages);
      if(data.totalPages === this.pageCount + 1) {
        console.log('InfiniteScroll Disabled'
        )
        event.target.disabled = true;
      }
    });
  }
  getNoticationCount(){
    this.storage.get('user').then(user => {
      this.queryService.getNotificationCountByReceiveridAndStatusUsingGET({status:'unread',receiverId: user.preferred_username})
          .subscribe(num => this.notificationCount=num);
    });
  }
  async openNotificationModal() {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'half-height'
    });
    return await modal.present();
  }
}
