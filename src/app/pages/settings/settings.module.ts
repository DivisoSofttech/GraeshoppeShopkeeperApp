import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SettingsOptionComponent } from 'src/app/components/settings-option/settings-option.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
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
  declarations: [SettingsPage],
  entryComponents: [
    SettingsOptionComponent
  ]
})
export class SettingsPageModule {}
