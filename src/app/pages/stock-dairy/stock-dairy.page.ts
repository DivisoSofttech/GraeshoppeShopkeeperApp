import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CreateEditStockDairyComponent } from 'src/app/components/create-edit-stock-dairy/create-edit-stock-dairy.component';

@Component({
  selector: 'app-stock-dairy',
  templateUrl: './stock-dairy.page.html',
  styleUrls: ['./stock-dairy.page.scss'],
})
export class StockDairyPage implements OnInit {

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
}
