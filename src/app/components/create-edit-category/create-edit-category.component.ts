import { CategoryDTO } from './../../api/models/category-dto';
import { ImageSelectorComponent } from './../image-selector/image-selector.component';
import { Category } from './../../api/models/category';
import { ModalController, PopoverController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit {

  category: Category = {};
  categoryDTO: CategoryDTO = {};
  mode = 'create';
  pop: boolean = false;
  @Input() throughProduct = 'false';
  @Output() update = new EventEmitter();
  //@ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private modalController: ModalController,
    private commandResource: CommandResourceService,
    private popover: PopoverController,
    private storage: Storage,
    private query: QueryResourceService
  ) { }

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.category.iDPcode = user.preferred_username
    });
    this.getcategoryDTOUsingCategory();
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
      this.categoryDTO.image = data.data.image.substring(data.data.image.indexOf(',') + 1);
      this.categoryDTO.imageContentType = data.data.image.slice(data.data.image.indexOf(':')+1,data.data.image.indexOf(';'));
    });

    return await modal.present();
  }
  // modal() {
  //     this.slides.slideTo(0);
  // }
  dismiss(data){
      this.modalController.dismiss(data);
  }

  addCategory(){
    this.commandResource.createProductCategoryUsingPOST(this.categoryDTO)
        .subscribe(data => {
          console.log("Category Added",data);
          this.update.emit();
          this.dismiss(data);
        })
        ,err => console.log("Error Creating Category",err);
    
  }
  updateCategory(){
    this.commandResource.updateCategoryUsingPUT(this.categoryDTO)
    .subscribe(data => {
      console.log("Category Updated",data);
      this.update.emit();
      this.dismiss(data);
    })
    ,err => console.log("Error Updating Category",err);
    
  }
  getcategoryDTOUsingCategory(){
    this.query.findCategoryUsingGET(this.category.id)
        .subscribe(categoryDTO => this.categoryDTO=categoryDTO)
  }

}
