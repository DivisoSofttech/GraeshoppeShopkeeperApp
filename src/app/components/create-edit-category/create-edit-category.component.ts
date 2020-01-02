import { Util } from './../../services/util';
import { CategoryDTO } from './../../api/models/category-dto';
import { ImageSelectorComponent } from './../image-selector/image-selector.component';
import { Category } from './../../api/models/category';
import { ModalController, PopoverController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit {
  loader: HTMLIonLoadingElement;
  category: Category = {

  };
  categoryDTO: CategoryDTO = {};
  mode = 'create';

  @Output() onSlide = new EventEmitter();

  @Output() added = new EventEmitter();
  @Input() throughProduct = 'false';
  // @ViewChild('slides', { static: false }) slides: IonSlides;

  categoryForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    description: new FormControl('')
  });
  constructor(
    private modalController: ModalController,
    private commandResource: CommandResourceService,
    private storage: Storage,
    private query: QueryResourceService,
    private util: Util
  ) { }

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.category.iDPcode = user.preferred_username;
      this.categoryDTO.iDPcode = user.preferred_username;
    });
    if (this.category.id != null) {
      this.getcategoryDTOUsingCategory();
    }
  }
  async selectImage() {

    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });

    modal.onDidDismiss()
    .then(data => {
      this.categoryDTO.image = data.data.image.substring(data.data.image.indexOf(',') + 1);
      this.categoryDTO.imageContentType = data.data.image.slice(data.data.image.indexOf(':') + 1, data.data.image.indexOf(';'));
    });

    return await modal.present();
  }
  // modal() {
  //     this.slides.slideTo(0);
  // }

  dismiss() {
      this.modalController.dismiss();
  }

  addCategory() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
    });
    this.commandResource.createProductCategoryUsingPOST(this.categoryDTO)
        .subscribe(data => {
          this.categoryDTO = data;
          this.loader.dismiss();
          this.util.createToast("Category Created",'checkmark');
          if(this.throughProduct=='false'){
            this.modalController.dismiss(data);
          }
          else{
            this.onSlide.emit();
            this.added.emit(this.categoryDTO);
          }
        }
        , err => {
          this.loader.dismiss();
          console.log('Error Creating Category', err);
          this.util.createToast("Category Creation Error",'alert');
      });

  }
  updateCategory() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
    });
    this.commandResource.updateCategoryUsingPUT(this.categoryDTO)
    .subscribe(data => {
      this.loader.dismiss();
      this.util.createToast("Category Updated",'checkmark');
      this.modalController.dismiss(data);
    }
    , err => {
      console.log('Error Updating Category', err);
      this.util.createToast("Category Updation Error",'alert');
    });

  }
  getcategoryDTOUsingCategory() {
    this.query.findCategoryByIdUsingGET(this.category.id)
        .subscribe(categoryDTO => this.categoryDTO = categoryDTO);
  }

  createCategory() {
    console.log(this.categoryDTO);
    if (this.mode === 'create') {
      if ((this.categoryDTO.image === null && this.categoryDTO.imageLink === null) || this.categoryDTO.name === null) {
        return true;
      }
    } else {
      if (this.categoryDTO.name === null) {
        return true;
      }
    }
    
    return false;
  }
}
