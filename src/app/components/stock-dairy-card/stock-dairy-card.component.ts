import { Component, OnInit, Output, Input } from '@angular/core';
import { StockEntry } from 'src/app/api/models';

@Component({
  selector: 'app-stock-dairy-card',
  templateUrl: './stock-dairy-card.component.html',
  styleUrls: ['./stock-dairy-card.component.scss'],
})
export class StockDairyCardComponent implements OnInit {

  @Input()stockEntry: StockEntry;
  
  constructor() { }

  ngOnInit() {}

}
