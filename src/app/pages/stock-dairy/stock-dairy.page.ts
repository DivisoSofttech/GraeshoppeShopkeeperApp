import { Util } from 'src/app/services/util';
import { Storage } from '@ionic/storage';
import { QueryResourceService } from 'src/app/api/services';
import { StockEntry } from './../../api/models/stock-entry';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateEditStockDairyComponent } from 'src/app/components/create-edit-stock-dairy/create-edit-stock-dairy.component';
import { StockDairyViewComponent } from 'src/app/components/stock-dairy-view/stock-dairy-view.component';

@Component({
  selector: 'app-stock-dairy',
  templateUrl: './stock-dairy.page.html',
  styleUrls: ['./stock-dairy.page.scss'],
})
export class StockDairyPage implements OnInit {

  stockEntries: StockEntry[] = [{
    date: '01-09-2019',
    description: 'product damaged',
    entryLineItems: [{
      description: 'qwerty',
      product: {
        name: 'Chicken Biriyani'
      },
      quantityAdjustment: 10,
      valueAdjustment: 0
    }],
    location: {
      name: 'abc',
      address: {
        city: 'palakkad'
      }
    },
    reason: {
      name: 'product Damaged',
      description: 'qwerty'
    },
    reference: 'asdfghjk'
  }];

  // stockEntries: StockEntry[] = [];

  pageCount;

  user;

  loader: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll, null) ionInfiniteScroll: IonInfiniteScroll;

  constructor(
    private modal: ModalController,
    private query: QueryResourceService,
    private storage: Storage,
    private util: Util
  ) { }

  ngOnInit() {
    this.util.createLoader().then(loader => {
      this.loader = loader;
      this.loader.present();
      this.storage.get('user').then(user => {
        this.user = user;
        this.getStockEntries(0);
        console.log('entries', this.stockEntries);
      });
    });
  }
  async createStockDairyModal() {
    const modal = await this.modal.create({
      component: CreateEditStockDairyComponent,
    });
    return await modal.present();
  }


  getStockEntries(i) {

    this.query.findAllStockEntriesUsingGET({page: i, storeId: this.user.preferred_username}).subscribe(page => {
      this.pageCount = page.totalPages;
      page.content.forEach(se => {
        this.query.getStockEntryBundleUsingGET(se.id).subscribe(seb => {
          se.entryLineItems = seb.entryLineItems;
          se.reason = seb.reason;
          se.location = seb.location;
          this.stockEntries.push(se);
        });
        this.loader.dismiss();
      }, err => {
        console.log('error', err);
        this.loader.dismiss();
      });
      this.loader.dismiss();
      if (i === page.totalPages) {
        this.toggleInfiniteScroll();
      }
    }, err => {
      console.log('error', err);
      this.loader.dismiss();
    });
  }

  toggleInfiniteScroll() {
    this.ionInfiniteScroll.disabled = !this.ionInfiniteScroll.disabled;
  }

  loadMoreStockEntry() {
    this.pageCount++;
    this.getStockEntries(this.pageCount);
  }

  deleteStockEntry(stock) {
    this.stockEntries = this.stockEntries.filter(s => s.id !== stock.id);
  }
}
