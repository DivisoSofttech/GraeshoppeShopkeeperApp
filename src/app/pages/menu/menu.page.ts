import { Storage } from '@ionic/storage';
import { QueryResourceService } from 'src/app/api/services';
import { Category } from './../../api/models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  categories: Category[] = [];
  page = 0;
  user;

  currentTab = 1;

  constructor(
    private query: QueryResourceService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.user = user;
      this.getAllCategory(this.page);
    });
  }

  getAllCategory(i) {
    this.query.findAllCategoriesByIdpCodeUsingGET({
      idpCode: this.user.preferred_username,
      page: i
    }).subscribe(pageOfCategory => {
      pageOfCategory.content.forEach(category => {
        this.categories.push(category);
      });
      if (pageOfCategory.totalPages > i + 1) {
        this.page++;
        this.getAllCategory(this.page);
      }
      console.log(this.categories);
    });
  }

}
