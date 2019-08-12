import { ComponentsModule } from 'src/app/components/components.module';
import { AddBannerComponent } from './../../components/add-banner/add-banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewEditBannerPage } from './view-edit-banner.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEditBannerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewEditBannerPage],
  entryComponents: [AddBannerComponent]
})
export class ViewEditBannerPageModule {}
