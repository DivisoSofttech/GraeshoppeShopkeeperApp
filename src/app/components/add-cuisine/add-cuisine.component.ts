import { CommandResourceService } from 'src/app/api/services';
import { Component, OnInit, Input } from '@angular/core';
import { StoreTypeDTO } from 'src/app/api/models';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-cuisine',
  templateUrl: './add-cuisine.component.html',
  styleUrls: ['./add-cuisine.component.scss'],
})
export class AddCuisineComponent implements OnInit {

  @Input()
  storeId;

  storetype: StoreTypeDTO;

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.storetype  = {name: '', storeId: this.storeId};
  }

  dismiss() {
    this.popoverCtrl.dismiss(this.storetype);
  }

}
