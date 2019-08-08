import { ProductViewComponent } from './../../components/product-view/product-view.component';

import { Storage } from '@ionic/storage';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from '../../api/services/query-resource.service';
import { Product } from '../../api/models/product';
import { Util } from 'src/app/services/util';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  loader: HTMLIonLoadingElement;

  pageCount = 0;

  products: Product[] = [];

  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll

  constructor(
    private storage: Storage,
    private util: Util,
    private queryService: QueryResourceService
  ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      this.getProducts(0 , true);
    });
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
          this.products.push(p);
        });
        i++;

        // Should load more pages or not 
        // limit === false load all pages at once
        // limit === true load only the first page
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
    this.products.push(product);
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

}
