import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expected-delivery',
  templateUrl: './expected-delivery.component.html',
  styleUrls: ['./expected-delivery.component.scss'],
})
export class ExpectedDeliveryComponent implements OnInit {

  selectedTime = '2005-06-17T00:20';

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.popoverController.dismiss();
  }

  dismissTrue() {
    console.log('pop time' , this.selectedTime);
    this.popoverController.dismiss(this.selectedTime);
  }

}
