import { UOM } from './../../api/models/uom';
import { Component, OnInit } from '@angular/core';
import { UOMDTO, StoreDTO, Store } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Util } from 'src/app/services/util';
import { ModalController } from '@ionic/angular';
import { CreateEditUomComponent } from 'src/app/components/create-edit-uom/create-edit-uom.component';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.page.html',
  styleUrls: ['./uom.page.scss'],
})
export class UomPage implements OnInit {

  user: any;

  uoms: UOMDTO[] = [];

  loader: HTMLIonLoadingElement = undefined;

  constructor(
    private queryResource: QueryResourceService,
    private storage: Storage,
    private util: Util,
    private modalController: ModalController
  ) { }


  ngOnInit() {
    
    this.storage.get('user')
    .then(data => {
        this.user = data;
        console.log('UOM PAGE Got store' , data);
        this.util.createLoader()
        .then(loader => {
          this.loader = loader;
          console.log('UOM PAGE loader created');          
          this.getUoms(0)      
        });
    })
  }


  getUoms(i) {
    if(i === 0) {
      // Present loader for the first page = 0 request only
      this.loader.present();
    }
    this.queryResource.findUOMByIDPcodeUsingGET({
      iDPcode: this.user.preferred_username
    }).subscribe(
      res => {
        res.content.forEach(uom => {
          this.uoms.push(uom);
        })
        i++;
        if(i < res.totalPages) {
          this.getUoms(i);
        } else {
          // Dismiss Loader after All Pages have been loaded
          this.loader.dismiss();
        }
      },
      err => {
        console.log('UOM PAGE unable to get uoms' , err);                  
        this.util.createToast('Unable to get Uoms , Server Error')
        this.loader.dismiss();
      }
    );
  }

  onAddUOM(uom) {
   this.uoms.push(uom);
  }

  remove(uom: UOM) {
    this.uoms.splice(
      this.uoms.indexOf(uom),
      1
    );
  }

}
