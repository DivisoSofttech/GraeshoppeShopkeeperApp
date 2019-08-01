import { Category } from './../../api/models/category';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit {

  category: Category = {};
  mode = 'create';
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log("Mode = ",this.mode);
    
  }
  dismiss(){
    this.modalController.dismiss();
  }

}
