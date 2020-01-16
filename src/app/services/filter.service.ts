import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  deliveryType;
  filter = new BehaviorSubject('all');

  constructor() { }

  filterBy(event) {
    this.filter.next(event);
  }
}
