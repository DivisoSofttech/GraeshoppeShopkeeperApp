import { SaleAggregate } from './../../api/models/sale-aggregate';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { QueryResourceService } from 'src/app/api/services';
import { Sale } from './../../api/models/sale';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-history',
  templateUrl: './sale-history.component.html',
  styleUrls: ['./sale-history.component.scss'],
})
export class SaleHistoryComponent implements OnInit {


  sales: SaleAggregate[] = [];
  currentSale: SaleAggregate = {};
  user;
  pagecount = 0;

  constructor(
    private query: QueryResourceService,
    private storage: Storage,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.user = user;
      this.getSales(0);
    });
  }

  getSales(i) {
    this.query.findAllSaleAggregatesUsingGET({storeId: this.user.preferred_username, page: i}).subscribe(pos => {
      pos.content.forEach(sale => {
        this.sales.push(sale);
      });
      console.log(pos.content);
      this.pagecount++;
    });
  }

  loadMoreSale() {
    this.getSales(this.pagecount);
  }

  dismiss() {
    this.modal.dismiss();
  }
}
