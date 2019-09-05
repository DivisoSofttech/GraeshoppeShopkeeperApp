import { StockEntry } from './../../api/models/stock-entry';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CreateEditStockDairyComponent } from 'src/app/components/create-edit-stock-dairy/create-edit-stock-dairy.component';
import { StockDairyViewComponent } from 'src/app/components/stock-dairy-view/stock-dairy-view.component';

@Component({
  selector: 'app-stock-dairy',
  templateUrl: './stock-dairy.page.html',
  styleUrls: ['./stock-dairy.page.scss'],
})
export class StockDairyPage implements OnInit {
  
  stockEntry: StockEntry[] = [{
    date: '01-09-2019',
    description: 'product damaged',
    entryLineItems: [{
      description: 'qwerty',
      product: {
        name: 'Chicken Biriyani'
      },
      quantityAdjustment: 10,
      valueAdjustment:0
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
  }]

  constructor(
    private modal: ModalController
  ) { }
 
  ngOnInit() {
  }
  
  async createStockDairyModal(){
    const modal = await this.modal.create({
      component: CreateEditStockDairyComponent,
    });
    return await modal.present();
  }

  async openStockDairyViewModal(stock){
    const modal = await this.modal.create({
      component: StockDairyViewComponent,
      componentProps: {stockEntry: stock}
    });
    return await modal.present();
  }
}
