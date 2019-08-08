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
    private modalController:  ModalController
  ) { }

  ngOnInit() {
    console.log(this.product);
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
