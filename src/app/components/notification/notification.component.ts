import { QueryResourceService } from 'src/app/api/services';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private query: QueryResourceService
  ) { }

  ngOnInit() {}

  dismiss(){
    this.modal.dismiss();
  }
}
