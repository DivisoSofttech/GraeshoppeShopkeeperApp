import { Util } from 'src/app/services/util';
import { CategoryViewComponent } from './../category-view/category-view.component';
import { CommandResourceService } from 'src/app/api/services';
import { CreateEditCategoryComponent } from './../create-edit-category/create-edit-category.component';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Category } from './../../api/models/category';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private command: CommandResourceService,
    private util: Util
  ) { }
  @Input()
  category: Category;
  @Output()
  update = new EventEmitter();
  @Output()
  delete = new EventEmitter();

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateEditCategoryComponent,
      componentProps: {mode:  'update' ,category: this.category}
    });
    modal.onDidDismiss()
    .then(data => {
     this.update.emit(data); 
    });
    return await modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Update',
        role: 'destructive',
        icon: 'create',
        handler: () => {
          this.presentModal();
          
          console.log('Edit clicked');
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.command.deleteCategoryUsingDELETE(this.category.id)
              .subscribe(data =>  {
                this.delete.emit();
                this.util.createToast("Category Deletion Success",'checkmark');
              },err => {
                this.util.createToast("Category Deletion Error",'alert');
              })
          console.log('Delete clicked');
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async viewCategoryModal(){
    const modal = await this.modalController.create({
      component: CategoryViewComponent,
      componentProps: {category: this.category}
    });
    return await modal.present();
   }

}
