import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-order',
  templateUrl: './filter-order.component.html',
  styleUrls: ['./filter-order.component.scss'],
})
export class FilterOrderComponent implements OnInit {

  deliveryType;
  delivery;
  collection;

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    if (this.deliveryType === 'delivery') {
      this.delivery = true;
    } else if (this.deliveryType === 'collection') {
      this.collection = true;
    } else {
      this.delivery = true;
      this.collection = true;
    }
  }

  dismiss() {
    if (this.delivery && this.collection) {
      this.deliveryType = 'all';
    } else if (this.delivery) {
      this.deliveryType = 'delivery';
    } else if (this.collection) {
      this.deliveryType = 'collection';
    }
    this.popoverController.dismiss(this.deliveryType);
  }

}
