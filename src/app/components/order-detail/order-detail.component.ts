import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Order, OrderLine, Product, Store, AuxilaryOrderLine, Offer } from 'src/app/api/models';
import { Subscription } from 'rxjs';
import { MatStepper, MatHorizontalStepper } from '@angular/material';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class OrderDetailComponent implements OnInit{

  @Output() backEvent = new EventEmitter();

  @Output() reorderEvent = new EventEmitter();

  @Output() continueEvent = new EventEmitter();

  @Input() order: Order;

  @Input() ShowContinueShopping = false;

  @Input() modalType = false;

  products: Product[] = [];

  auxilariesProducts = {};

  orderLines: OrderLine[] = [];

  offer: Offer[] = [];

  auxilaryOrderLines: AuxilaryOrderLine = {};

  taskDetailsSubscription: Subscription;
  orderLinesByOrderIdSubscription: Subscription;
  productByProductIdSubscrption: Subscription;
  auxilayByProductIdSubscription: Subscription;

  @Input() store: Store;

  total = {};

  addressString: String;
  orderPlaced: boolean;
  orderApproved: boolean;
  orderDelivered: boolean;

  constructor(
    private queryResource: QueryResourceService,
    private modalController: ModalController
  ) { }

  @ViewChild(MatHorizontalStepper, null) stepper: MatStepper;

  initStepper() {
    if (this.orderPlaced) {
      this.stepper.selected.state = 'done';
    } else if (this.orderApproved) {
      this.stepper.selected.state = 'done';
      this.stepper.next();
      this.stepper.selected.state = 'done';
    } else if (this.orderDelivered) {
      this.stepper.selected.state = 'done';
      this.stepper.next();
      this.stepper.selected.state = 'done';
      this.stepper.next();
      this.stepper.selected.completed = true;
    }
  }

  ngOnInit() {
    this.getOrderLines(0);
    this.getAppliedOffers(this.order.id);
    this.checkOrderType();
  }

  ngAfterViewInit() {
    this.initStepper();
  }

  checkOrderType() {
    switch (this.order.status.name) {

      case 'payment-processed-unapproved':
        this.orderPlaced = true;
        this.orderApproved = false;
        this.orderDelivered = false;
        break;
      case 'payment-processed-approved':
        this.orderPlaced = false;
        this.orderApproved = true;
        this.orderDelivered = false;
        break;
      case 'delivered':
        this.orderPlaced = false;
        this.orderApproved = false;
        this.orderDelivered = true;
        break;
      default:break;
    }
  }

  getOrderDetails() {
    this.queryResource.getOrderAggregatorUsingGET(this.order.orderId)
      .subscribe(data => {
      });
  }

  getOrderLines(i) {
    this.orderLinesByOrderIdSubscription = this.queryResource.findAllOrderLinesByOrderIdUsingGET({
      orderId: this.order.id
    })
      .subscribe(orderLines => {
        orderLines.content.forEach(o => {
          this.total[o.id] = 0;
          this.orderLines.push(o);
          this.auxilariesProducts[o.productId] = [];
          this.auxilaryOrderLines[o.id] = [];
          this.getProducts(o.productId);
          this.getAuxilaryOrderLines(o, 0);
        });
        i++;
        if (i < orderLines.totalPages) {
          this.getOrderLines(i);
        }
      });
  }

  getAppliedOffers(id) {
    this.queryResource.findOfferLinesByOrderIdUsingGET(id)
      .subscribe(offerLines => {
        this.offer = offerLines;
      });
  }

  getAuxilaryOrderLines(o, i) {
    this.queryResource.findAuxilaryOrderLineByOrderLineIdUsingGET({
      orderLineId: o.id
    })
      .subscribe(auxLines => {
        auxLines.content.forEach(auxLine => {
          this.total[o.id] += auxLine.total;
          this.auxilaryOrderLines[o.id].push(auxLine);
          this.getAuxilaryProduct(o.productId, auxLine.productId)
        });
        i++;
        if (i < auxLines.totalPages) {
          this.getAuxilaryOrderLines(o, i);
        } else {
        }
      });
  }

  getProducts(id) {
    this.productByProductIdSubscrption = this.queryResource.findProductByIdUsingGET(id)
      .subscribe(data => {
        this.products[data.id] = data;
      });
  }

  getAuxilaryProduct(pid, id) {
    this.queryResource.findProductByIdUsingGET(id)
      .subscribe(auxProduct => {

        //Hack to Make Product Usable in Places Where AuxilaryLineItem 
        // is used Just add auxilaryItem key to the object

        auxProduct['auxilaryItem'] = auxProduct;
        this.auxilariesProducts[pid + ''][id + ''] = auxProduct;

      })
  }

  continue() {
    this.continueEvent.emit();
  }

  dismiss() {
   this.backEvent.emit();
  }

  modalDismiss() {
    this.modalController.dismiss();
  }
}
