import { FilterService } from './../../services/filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  constructor(
    private filterService : FilterService
  ) { }

  ngOnInit() {}

  filter(event) {
    this.filterService.deliveryType = event.detail.value;
  }

}
