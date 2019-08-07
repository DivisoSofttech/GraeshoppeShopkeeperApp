import { CreateEditCategoryComponent } from './../../components/create-edit-category/create-edit-category.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Category } from './../../api/models/category';
import { Component, OnInit } from '@angular/core';
import { QueryResourceService } from '../../api/services/query-resource.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {


  categories: Category[] = [];

  constructor(
    private queryService: QueryResourceService,
    private storage: Storage
  ) { }

  onAddCategory(category) {
    this.queryService.findCategoryByIdUsingGET(category.id)
    .subscribe(categoryDomain => this.categories.push(categoryDomain))
   }
  ngOnInit() {
    this.storage.get('user').then(user => {
      this.queryService.findAllCategoriesUsingGET({storeId: user.preferred_username}).subscribe(res => {
        this.categories = res.content;
      });
    });
  }
  updateCategory(category){
    console.log('product', category);
    this.queryService.findCategoryByIdUsingGET(category.id)
        .subscribe(category => {
          const categoryDomain: Category = category;
          const index = this.categories.findIndex(p => p.id === category.id);
          this.categories.splice(index, 1, categoryDomain);
        })
  }
  deleteCategory(category: Category){
    this.categories = this.categories.filter(c=>c !== category)
  }

}
