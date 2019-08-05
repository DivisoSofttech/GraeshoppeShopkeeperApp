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
  constructor(
    private commandResource: CommandResourceService,
    private modalController: ModalController,
    private util: Util
  ) { }

  ngOnInit() {}

  deleteUOM() {
    this.commandResource.deleteUOMUsingDELETE(this.uom.id).subscribe(
      res => {
        this.deleteEvent.emit();
        this.util.createToast('Deletion successful');
      },
      err => {
        this.util.createToast('Couldn\'t delete item');
      }
    );
  }

  async editUOM(uom) {
    const modal = await this.modalController.create({
      component: CreateEditUomComponent,
      componentProps: {mode:  'update' , uom: this.uom}
    });

    modal.onDidDismiss()
    .then()

    return await modal.present();
  }

}
