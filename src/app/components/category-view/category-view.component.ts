import { Category } from './../../api/models/category';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {

  category: Category;

  constructor(
    private modalController:  ModalController
  ) { }

  ngOnInit() {
    console.log(this.category);
    
  } 

  dismiss(){
    this.modalController.dismiss();
  }
}
