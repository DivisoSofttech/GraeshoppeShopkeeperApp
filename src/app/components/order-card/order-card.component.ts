import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/api/models';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  constructor() { }

  ngOnInit() {}

}
