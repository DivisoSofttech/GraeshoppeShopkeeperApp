import { UOMDTO } from './../../api/models/uomdto';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-edit-uom',
  templateUrl: './create-edit-uom.component.html',
  styleUrls: ['./create-edit-uom.component.scss'],
})
export class CreateEditUomComponent implements OnInit {

  mode = 'create';
  uom: UOMDTO = {};
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log("Mode = ",this.mode);
    
  }
  dismiss(){
    this.modalController.dismiss();
  }

}
