import { Product } from './../../api/models/product';
import { AuxItem } from './../../api/models/aux-item';
import { QueryResourceService } from 'src/app/api/services';
import { OrderLine } from './../../api/models/order-line';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-product-card',
  templateUrl: './order-product-card.component.html',
  styleUrls: ['./order-product-card.component.scss'],
})
export class OrderProductCardComponent implements OnInit {
  @Input() orderLine: OrderLine = {};
  aux: AuxItem[] = [];
  showAux = false;
  constructor(private query: QueryResourceService) { }

  ngOnInit() {
    this.getAuxItems();
  }

  getAuxItems() {
    console.log(this.orderLine.id);
    this.query.findAuxItemsByIdUsingGET(this.orderLine.id).subscribe(aux => {
      this.aux = aux;
      console.log('aux on order', aux);
    });
  }

  getOfferLineItems() {

  }

  toggleShowAux() {
    this.showAux = !this.showAux;
  }

}
