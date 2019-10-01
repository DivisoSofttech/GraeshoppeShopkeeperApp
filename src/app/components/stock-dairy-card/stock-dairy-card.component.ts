import { CommandResourceService } from 'src/app/api/services';
import { CreateEditStockDairyComponent } from 'src/app/components/create-edit-stock-dairy/create-edit-stock-dairy.component';
import { ModalController } from '@ionic/angular';
import { StockDairyViewComponent } from './../stock-dairy-view/stock-dairy-view.component';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { StockEntry } from 'src/app/api/models';

@Component({
  selector: 'app-stock-dairy-card',
  templateUrl: './stock-dairy-card.component.html',
  styleUrls: ['./stock-dairy-card.component.scss'],
})
export class StockDairyCardComponent implements OnInit {

  @Input()stockEntry: StockEntry;

  @Output()delete = new EventEmitter();

  constructor(
    private modal: ModalController,
    private command: CommandResourceService
  ) { }

  ngOnInit() {}

  async openStockDairyViewModal() {
    const modal = await this.modal.create({
      component: StockDairyViewComponent,
      componentProps: {stockEntry: this.stockEntry}
    });
    return await modal.present();
  }

  deletestockEntry() {
    this.command.deleteStockEntryUsingDELETE(this.stockEntry.id).subscribe(() => {
      this.stockEntry.entryLineItems.forEach(eli => {
        this.command.deleteEntryLineItemUsingDELETE(eli.id).subscribe();
      });
      this.delete.emit();
    });
  }
  async editstockEntry() {
    const modal = await this.modal.create({
      component: CreateEditStockDairyComponent,
      componentProps: {
        stockEntry: this.stockEntry,
        mode: 'update'
      }
    });
    return await modal.present();
  }

}
