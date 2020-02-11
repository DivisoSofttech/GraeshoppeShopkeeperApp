import { Product } from 'src/app/api/models';
import { Storage } from '@ionic/storage';
import { QueryResourceService } from 'src/app/api/services';
import { Category } from './../../api/models/category';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss'],
})
export class CategoryProductComponent implements OnInit {

  @Input() category: Category = {};
  products: Product[] = [];

  page = 0;
  user;
  constructor(
    private storage: Storage,
    private query: QueryResourceService
  ) { }

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.user = user;
      this.findProduct(this.page);
    });
  }

  findProduct(i) {
    this.query.findProductByCategoryIdUsingGET({
      storeId: this.user.preferred_username,
      categoryId: this.category.id,
      page: i
    }).subscribe(pageOfProduct => {
      pageOfProduct.content.forEach(product => {
        this.products.push(product);
        if (pageOfProduct > i + 1) {
          this.page++;
          this.findProduct(this.page);
        }
      });
      console.log(this.products);
    });
  }

}
