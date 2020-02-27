import { CreateOfferComponent } from './../../components/create-offer/create-offer.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
  }

  async openCreateOfferModal() {
    const modal = await this.modal.create({
      component: CreateOfferComponent
    });
    return await modal.present();
  }

}
