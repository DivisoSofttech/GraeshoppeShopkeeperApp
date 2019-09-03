import { ModalController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-edit-stock-dairy',
  templateUrl: './create-edit-stock-dairy.component.html',
  styleUrls: ['./create-edit-stock-dairy.component.scss'],
})
export class CreateEditStockDairyComponent implements OnInit {

  mode: string = 'create';

  reason: boolean = false;

  location: boolean = false;

  currentSlide: string;

  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  dismiss(){
    this.modal.dismiss();
  }

  toggleAddReason(){
    this.reason = !this.reason;
  }

  toggleAddLocation(){
    this.location = !this.location;
  }

  slide(value: string){
    this.currentSlide = value;
    if(value === '1'){
      this.slides.slideTo(1);
    }
    else{
      this.slides.slideTo(0);
    }
  }
}
