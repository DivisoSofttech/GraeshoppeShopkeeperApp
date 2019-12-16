import { NotificationComponent } from './../../components/notification/notification.component';
import { ActionSheetController, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Category } from './../../api/models/category';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from '../../api/services/query-resource.service';
import { Storage } from '@ionic/storage';
import { Util } from 'src/app/services/util';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  loader: HTMLIonLoadingElement;

  categories: Category[] = [];

  tempCategories: Category[] = [];

  pageCount = 0;

  showSearchbar = false;

  searchTerm: string;

  @ViewChild(IonInfiniteScroll , null) infiniteScroll: IonInfiniteScroll;
  notificationCount: number;

  constructor(
    private queryService: QueryResourceService,
    private storage: Storage,
    private util: Util,
    private modalController: ModalController,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      //this.getNoticationCount();
      this.getCategories(0 , true);
    });
  }
  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
    this.categories = this.tempCategories;
    console.log(this.categories);
  }

  searchCategories(i) {
    this.storage.get('user').then(user => {
    this.queryService.findAllCategoriesByNameAndIdpCodeUsingGET({
      idpCode: user.preferred_username,
      name: this.searchTerm,
      page: i
    }).subscribe(res => {
        this.categories = [];
        res.content.forEach(category => this.categories.push(category));
        console.log('searchterm : ', this.searchTerm);
        console.log('searched : ', res.content);


        i++;
        if (i < res.totalPages) {
          this.searchCategories(i);
        } else {
          this.loader.dismiss();
        }
      });

    });
  }

  onAddCategory(category) {
    this.queryService.findCategoryByIdUsingGET(category.id)
    .subscribe(categoryDomain => this.categories.push(categoryDomain));
   }


  getCategories(i , limit?: Boolean , success?) {
    let iDPcode;
    this.storage.get('user').then(user => {

      iDPcode = user.preferred_username;
      console.log("idpCode=",iDPcode);
      this.queryService.findAllCategoriesByIdpCodeUsingGET({idpCode:iDPcode})
      .subscribe(res => {
        this.infiniteScroll.complete();
        if (i === res.totalPages) {
          this.toggleInfiniteScroll();
        }
        success !== undefined ? success(res) : null;

        console.log('Total Pages:' , res.totalPages , ' Total Element:' , res.totalElements);
        res.content.forEach(c => {
          this.categories.push(c);
          this.tempCategories.push(c);
        });
        i++;
        if (i == res.totalPages) {
          this.toggleInfiniteScroll();
        }
        // Should load more pages or not
        // limit === false load all pages at once
        // limit === true load only the first page
        if (limit === false) {
          if (i < res.totalPages) {
            this.getCategories(i , limit);
          } else {
            this.loader.dismiss();
          }
        } else {
          this.loader.dismiss();
        }
      }
      , err => {
        console.log("error getting categories",err);
        this.loader.dismiss();
      });
    });
  }

  updateCategory(category) {
    if (category.data != undefined) {
    this.queryService.findCategoryByIdUsingGET(category.data.id)
        .subscribe(category => {
          const categoryDomain: Category = category;
          const index = this.categories.findIndex(p => p.id === category.id);
          this.categories.splice(index, 1, categoryDomain);
        });
      }
  }

  deleteCategory(category: Category) {
    this.categories = this.categories.filter(c => c !== category);
  }

  refresh(event) {
    this.categories = [];
    this.pageCount = 0;
    this.infiniteScroll.disabled = false;
    this.getCategories(0 , true , () => {
      // Disable Refresh after Completion
      event.target.complete();
    });
  }

  loadMoreCategories(event) {
    this.pageCount++;
    this.getCategories(this.pageCount , true , (data) => {

      // Disable infinite scroll if all pages have been loaded
      console.log(this.pageCount + 1, '==' , data.totalPages);
      if (data.totalPages === this.pageCount + 1) {
        console.log('InfiniteScroll Disabled'
        );
        event.target.disabled = true;
      }
    });
  }
  async openNotificationModal() {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'half-height'
    });
    return await modal.present();
  }
  getNoticationCount() {
    this.notificationCount = this.notification.notificationCount;
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
