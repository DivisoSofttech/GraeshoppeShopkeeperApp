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
    console.log('Storeidpcode' , this.storeIdpcode)
    if(this.storeIdpcode === undefined) {
      this.util.createToast('Server Error');
    } else {
      this.uom.idpcode = this.storeIdpcode;
    }
  }
  dismiss(data){
    this.modalController.dismiss(data);
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

}
