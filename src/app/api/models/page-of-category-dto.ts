/* tslint:disable */
import { CategoryDTO } from './category-dto';
import { Sort } from './sort';
export interface PageOfCategoryDTO {
  content?: Array<CategoryDTO>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
