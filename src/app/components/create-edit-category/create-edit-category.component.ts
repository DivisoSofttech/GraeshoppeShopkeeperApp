import { Category } from './../../api/models/category';
import { ModalController, PopoverController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit {

  category: Category = {};
  mode = 'create';
  pop: boolean = false;
  
  @Input() throughProduct = 'false';
  //@ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private modalController: ModalController,
    private commandResource: CommandResourceService,
    private popover: PopoverController
  ) { }

  ngOnInit() {
    console.log("Mode = ",this.mode);
    
  }
  // modal() {
  //     this.slides.slideTo(0);
  // }
  dismiss(){
    if(this.pop){
      this.popover.dismiss();
    }
    else{
      this.modalController.dismiss();
    }
  }

  addCategory(){
    this.commandResource.createProductCategoryUsingPOST(this.category)
        .subscribe(data => console.log("Category Added",data))
        ,err => console.log("Error Creating Category",err);
  }

}
