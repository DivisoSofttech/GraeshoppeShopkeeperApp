import { ImageSelectorComponent } from './../image-selector/image-selector.component';
import { Category } from './../../api/models/category';
import { ModalController, PopoverController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';

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
    private popover: PopoverController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.category.iDPcode = user.preferred_username
    });
    console.log("Mode = ",this.mode);
    console.log("Cate = ",this.category);
    
  }
  async selectImage() {

    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });

    modal.onDidDismiss()
    .then(data => {
      console.log("sdf",data);
      console.log("base",data.data.image.substring(data.data.image.indexOf(',') + 1));
      console.log("type",data.data.image.slice(data.data.image.indexOf(':'),data.data.image.indexOf(';')));
      
      
      this.category.image = data.data.image.substring(data.data.image.indexOf(',') + 1);
      this.category.imageContentType = data.data.imageType;
    });

    return await modal.present();
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
  updateCategory(){
    this.commandResource.updateCategoryUsingPUT(this.category)
    .subscribe(data => console.log("Category Updated",data))
    ,err => console.log("Error Updating Category",err);
  }

}
