import { CreateEditCategoryComponent } from './../../components/create-edit-category/create-edit-category.component';
import { ActionSheetController, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Category } from './../../api/models/category';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from '../../api/services/query-resource.service';
import { Storage } from '@ionic/storage';
import { Util } from 'src/app/services/util';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  loader: HTMLIonLoadingElement;

  categories: Category[] = [];

  pageCount = 0;

  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll

  constructor(
    private queryService: QueryResourceService,
    private storage: Storage,
    private util: Util
  ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      this.getCategories(0 , true);
    });
  }

  getCategories(i , limit?:Boolean , success?) {
    let iDPcode;
    this.storage.get('user').then(user => {
      iDPcode = user.preferred_username;
      this.queryService.findAllCategoriesUsingGET({storeId: iDPcode})
      .subscribe(res => {

        success != undefined?success(res):null;
        
        console.log('Total Pages:' , res.totalPages , ' Total Element:' , res.totalElements);
        res.content.forEach(c => {
          this.categories.push(c);
        });
        i++;

        // Should load more pages or not 
        // limit === false load all pages at once
        // limit === true load only the first page
        if(limit === false) {
          if(i < res.totalPages) {
            this.getCategories(i , limit);  
          } else {
            this.loader.dismiss();
          }
        } else {
          this.loader.dismiss();
        }
      }
      ,err=>{
        this.loader.dismiss();
      });
    });
  }

  updateCategory(category){
    //console.log("tyuee",category);
    this.categories = this.categories.filter(c => c.id !== category.data.id);
    this.categories.push(category.data);
  }

  deleteCategory(category: Category){
    this.categories = this.categories.filter(c=>c !== category)
  }

  onAddCategory(category) {
    this.categories.push(category);
  }

  refresh(event) {
    this.categories = [];
    this.pageCount = 0;
    this.infiniteScroll.disabled = false;
    this.getCategories(0 , true , ()=>{
      // Disable Refresh after Completion
      event.target.complete();
    });
  }

  loadMoreCategories(event) {
    this.pageCount++;
    this.getCategories(this.pageCount , true , (data)=>{

      // Disable infinite scroll if all pages have been loaded
      console.log(this.pageCount + 1,'==' , data.totalPages);
      if(data.totalPages === this.pageCount + 1) {
        console.log('InfiniteScroll Disabled'
        )
        event.target.disabled = true;
      }
    });
  }

}
