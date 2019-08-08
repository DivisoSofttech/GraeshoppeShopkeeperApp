import { CommandResourceService } from 'src/app/api/services';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { StoreTypeDTO } from 'src/app/api/models';
import { PopoverController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-add-cuisine',
  templateUrl: './add-cuisine.component.html',
  styleUrls: ['./add-cuisine.component.scss'],
})
export class AddCuisineComponent implements OnInit, AfterViewInit {

  @Input()
  storeId;

  @ViewChild('input', {static: false})  myInput: IonInput;
  storetype: StoreTypeDTO;

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.storetype  = {name: '', storeId: this.storeId};
    setTimeout(() => {
      this.myInput.setFocus();
 }, 400);
  }

  ngAfterViewInit() {

  }

  dismiss() {
    if (this.storetype.name !== null && this.storetype.name !== undefined && this.storetype.name !== '') {
      this.popoverCtrl.dismiss(this.storetype);
    } else {
      this.popoverCtrl.dismiss();
    }
  }

}
