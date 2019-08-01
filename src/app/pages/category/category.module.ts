import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryPage } from './category.page';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage
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
  declarations: [CategoryPage],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  entryComponents: [CategoryCardComponent]
})
export class CategoryPageModule {}
