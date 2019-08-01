import { Category } from './../../api/models/category';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {

  constructor() { }
  @Input()
  category: Category;

  ngOnInit() {}

}
