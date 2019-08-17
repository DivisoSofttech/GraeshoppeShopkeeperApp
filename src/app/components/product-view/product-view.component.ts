import { QueryResourceService } from 'src/app/api/services';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/api/models';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {

  product: Product;

  constructor(
    private modalController:  ModalController,
    private query: QueryResourceService
  ) { }

  ngOnInit() {
    this.query.getProductBundleUsingGET(this.product.id).subscribe(productBundle =>{
      this.product.auxilaryLineItems = productBundle.auxilaryLineItems;
      this.product.comboLineItems = productBundle.comboLineItems;
    })
    console.log(this.product);
    
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
