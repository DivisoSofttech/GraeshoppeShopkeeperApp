import { ComponentsModule } from 'src/app/components/components.module';
import { CreateOfferComponent } from './../../components/create-offer/create-offer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OffersPage],
  entryComponents: [CreateOfferComponent]
})
export class OffersPageModule {}
