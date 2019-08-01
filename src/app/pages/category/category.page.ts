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

  constructor(private queryService: QueryResourceService,
              private storage: Storage) { }

  categories: Category[];
  ngOnInit() {
    this.storage.get('user').then(user => {
      this.queryService.findAllCategoriesUsingGET({storeId: user.preferred_username}).subscribe(res => {
        this.categories = res.content;
      });
    });
  }

}
