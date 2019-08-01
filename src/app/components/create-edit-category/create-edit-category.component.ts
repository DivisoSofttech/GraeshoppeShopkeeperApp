import { Category } from './../../api/models/category';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit {

  category: Category = {};
  mode = 'create';
  constructor(
    private modalController: ModalController,
    private commandResource: CommandResourceService
  ) { }

  ngOnInit() {
    console.log("Mode = ",this.mode);
    
  }
  dismiss(){
    this.modalController.dismiss();
  }

  addCategory(){
    this.commandResource.createProductCategoryUsingPOST(this.category)
        .subscribe(data => console.log("Category Added",data))
        ,err => console.log("Error Creating Category",err);
  }

}
