import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private query: QueryResourceService,
    private command: CommandResourceService
  ) { }

  selectedWeekdays = [];

  weekdays = ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']

  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }

  createOffer() {
    // this.command.createOffer
  }

  selectWeekdays(day) {
    if (this.selectedWeekdays.includes(day)) {
      this.selectedWeekdays = this.selectedWeekdays.filter(w => w !== day);
    } else {
      this.selectedWeekdays.push(day);
    }
  }

  isSelected(day) {
    return this.selectedWeekdays.includes(day);
  }



}
