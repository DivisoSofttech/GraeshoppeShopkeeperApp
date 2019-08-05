import { UOMDTO } from './../../api/models/uomdto';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UOM } from 'src/app/api/models';
import { CommandResourceService } from 'src/app/api/services';
import { Util } from 'src/app/services/util';
import { ModalController } from '@ionic/angular';
import { CreateEditUomComponent } from '../create-edit-uom/create-edit-uom.component';

@Component({
  selector: 'app-uom-card',
  templateUrl: './uom-card.component.html',
  styleUrls: ['./uom-card.component.scss'],
})
export class UomCardComponent implements OnInit {
  @Input()
  uom: UOMDTO = {
    unit: 'KG',
    description: 'Kilograms',
    iDPcode: 'ACD8270',
  };

  @Output()
  deleteEvent = new EventEmitter();
  isreadMore = false;
  readMore() {
    this.isreadMore = !this.isreadMore;
  }

  @Output() updateEvent = new EventEmitter();

  constructor(
    private commandResource: CommandResourceService,
    private modalController: ModalController,
    private util: Util
  ) { }

  ngOnInit() {}

  deleteUOM() {
    this.util.createLoader()
    .then(loader => {

      loader.present();
      this.commandResource.deleteUOMUsingDELETE(this.uom.id).subscribe(
        res => {
          this.deleteEvent.emit();
          loader.dismiss();
          this.util.createToast('Deletion successful');
        },
        err => {
          loader.dismiss();
          this.util.createToast('Couldn\'t delete item');
        }
      );
  
      
    })
  }

  async editUOMModal() {
    const modal = await this.modalController.create({
      component: CreateEditUomComponent,
      componentProps: {mode:  'update' , uom: this.uom}
    });

    modal.onDidDismiss()
    .then(data => {

      if(data.data != undefined) {
        this.updateEvent.emit(data.data);
      }

    })

    return await modal.present();
  }

}
