import { OrderLine } from './../../api/models/order-line';
import { Component, OnInit, Input } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { AuxilaryLineItem, Product, AuxItem } from 'src/app/api/models';

@Component({
  selector: 'app-order-product-card',
  templateUrl: './order-product-card.component.html',
  styleUrls: ['./order-product-card.component.scss'],
})
export class OrderProductCardComponent implements OnInit {

  @Input() orderLine: OrderLine;

  auxItems: AuxItem[] = [];

  constructor(
    private queryResourceService: QueryResourceService
  ){}

  ngOnInit(){
    this.getAuxilaryOrderLine();
  }


  getAuxilaryOrderLine() {
    this.queryResourceService.findAuxItemsByIdUsingGET(this.orderLine.id).subscribe(aux => {
      this.auxItems= aux;
      console.log('AuxItems' , this.auxItems);
    });
  }

}
