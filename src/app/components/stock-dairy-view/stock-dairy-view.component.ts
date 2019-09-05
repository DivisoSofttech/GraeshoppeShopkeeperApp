import { StockEntry } from 'src/app/api/models';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-dairy-view',
  templateUrl: './stock-dairy-view.component.html',
  styleUrls: ['./stock-dairy-view.component.scss'],
})
export class StockDairyViewComponent implements OnInit {

  stockEntry: StockEntry;
  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  dismiss(){
    this.modal.dismiss();
  }

}