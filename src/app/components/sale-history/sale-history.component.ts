import { Product } from 'src/app/api/models';
// import { TicketLine } from './../../api/models/ticket-line';
// import { SaleAggregate } from './../../api/models/sale-aggregate';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { QueryResourceService } from 'src/app/api/services';
// import { Sale } from './../../api/models/sale';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-history',
  templateUrl: './sale-history.component.html',
  styleUrls: ['./sale-history.component.scss'],
})
export class SaleHistoryComponent implements OnInit {


  // sales: SaleAggregate[] = [];
  // currentSale: SaleAggregate = {};
  user;
  pagecount = 0;
  saleDetails = [];
  products: string[] = [];

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
    // this.query.findAllSaleAggregatesUsingGET({storeId: this.user.preferred_username, page: i}).subscribe(pos => {
    //   pos.content.forEach(sale => {
    //     this.sales.push(sale);
    //   });
    //   console.log(pos.content);
    //   this.pagecount++;
    //   //this.getProductName();
    // });
  }

  loadMoreSale() {
    this.getSales(this.pagecount);
  }

  dismiss() {
    this.modal.dismiss();
  }
  // getProductName() {
  //   this.sales.forEach( sl => {
  //     sl.ticketLines.forEach(tl => {
  //       if (this.products[tl.productId] == null) {
  //         this.query.findProductByIdUsingGET(tl.productId).subscribe(pro => {
  //           this.products[tl.productId] = pro.name;
  //         });
  //       }
  //     });
  //   });
  //   console.log(this.products);
  // }
}
