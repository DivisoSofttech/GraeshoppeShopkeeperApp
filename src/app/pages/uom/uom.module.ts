import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UomPage } from './uom.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddComponent } from 'src/app/components/add/add.component';

const routes: Routes = [
  {
    path: '',
    component: UomPage
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
  declarations: [UomPage],
  entryComponents: [AddComponent]
})
export class UomPageModule {}
