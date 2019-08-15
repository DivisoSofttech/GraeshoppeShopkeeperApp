import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/api/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit {

  order: Order = {};
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss();
  }
}
