import { UOMDTO } from './../../api/models/uomdto';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { CommandResourceService } from 'src/app/api/services';
import { Util } from 'src/app/services/util';

@Component({
  selector: 'app-create-edit-uom',
  templateUrl: './create-edit-uom.component.html',
  styleUrls: ['./create-edit-uom.component.scss'],
})
export class CreateEditUomComponent implements OnInit {

  @Input() throughProduct = 'false';
  
  mode = 'create';
  
  uom: UOMDTO = {};

  storeIdpcode;

  constructor(
    private commandResource: CommandResourceService,
    private modalController: ModalController,
    private util: Util
  ) { }

  ngOnInit() {
    console.log("Mode = ",this.mode);
    if(this.storeIdpcode === undefined && this.mode === 'create') {
      console.log('Server Error : idpcode');
    } else if(this.mode !== 'update') {
      console.log('Storeidpcode' , this.storeIdpcode)
      this.uom.idpcode = this.storeIdpcode;
    }
  }


  createUom() {
    this.util.createLoader()
    .then(loader => {
      loader.present();
      this.commandResource.createUOMUsingPOST(this.uom)
      .subscribe(uom => {
        this.dismiss(uom);
        loader.dismiss();
      } , err => {
        loader.dismiss();
        this.util.createToast('Unable to create UOM , Server Error');
      });  
    })
  }

  updateUom() {
    this.util.createLoader()
    .then(loader => {
      loader.present();
      this.commandResource.updateUOMUsingPUT(this.uom)
      .subscribe(uom => {
        this.dismiss(uom);
        loader.dismiss();
      } , err => {
        loader.dismiss();
        this.util.createToast('Unable to Update UOM , Server Error');
      });  
    })
  }

  dismiss(data){
    this.modalController.dismiss(data);
  }

}
