import { Storage } from '@ionic/storage';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { ContactDTO } from './../../api/models/contact-dto';
import { CustomerDTO } from './../../api/models/customer-dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Util } from 'src/app/services/util';
import { Customer } from 'src/app/api/models';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-create-select-customer',
  templateUrl: './create-select-customer.component.html',
  styleUrls: ['./create-select-customer.component.scss'],
})
export class CreateSelectCustomerComponent implements OnInit {
  user;
  customer: CustomerDTO = {};
  contact: ContactDTO = {};
  showCustomer = false;
  customers: Customer[] = [];
  pageCount = 0;

  @ViewChild(IonInfiniteScroll, null) ionInfiniteScroll: IonInfiniteScroll;

  constructor(
    private modal: ModalController,
    private commandResource: CommandResourceService,
    private util: Util,
    private queryResource: QueryResourceService,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.user = user;
      this.getCustomers(0);
    });
  }

  dissmiss() {
    this.modal.dismiss();
  }

  toggleCustomer() {
    this.showCustomer = !this.showCustomer;
  }

  dissmissData(data) {
    this.modal.dismiss(data);
  }

  createCustomer(use) {
    this.util.createLoader().then(loader => {
      loader.present();
      this.commandResource.createContactUsingPOST(this.contact).subscribe(con => {
        this.customer.contactId = con.id;
        this.commandResource.createCustomerUsingPOST(this.customer).subscribe(cus => {
          loader.dismiss();
          if (use === true) {
            this.dissmissData(cus);
          } else {
            this.showCustomer = false;
          }
        }, err => {
          console.log('customer', err);
          loader.dismiss();
        });
      }, err => {
        console.log('contact', err);
        loader.dismiss();
      });
    });
  }
  getCustomers(i) {
    this.queryResource.findAllCustomersWithoutSearchUsingGET({}).subscribe(cus => {
      cus.content.forEach(customer => {
        this.customers.push(customer);
      });
      if (cus.totalPages === this.pageCount + 1) {
        this.toggleInfiniteScroll();
      }
      this.pageCount = cus.totalPages;
    });
  }

  loadMoreCustomer() {
    this.pageCount++;
    this.getCustomers(this.pageCount);
  }

  toggleInfiniteScroll() {
    this.ionInfiniteScroll.disabled = !this.ionInfiniteScroll.disabled;
  }



}
