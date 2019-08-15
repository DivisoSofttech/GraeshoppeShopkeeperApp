import { MapComponent } from './../../components/map/map.component';
import { AddCuisineComponent } from './../../components/add-cuisine/add-cuisine.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ImageSelectorComponent } from './../../components/image-selector/image-selector.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditRestaurantPage } from './edit-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: EditRestaurantPage
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
  declarations: [EditRestaurantPage],
  entryComponents: [ImageSelectorComponent, AddCuisineComponent, MapComponent]
})
export class EditRestaurantPageModule {}
