import { UOM } from './../../api/models/uom';
import { Component, OnInit } from '@angular/core';
import { UOMDTO } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.page.html',
  styleUrls: ['./uom.page.scss'],
})
export class UomPage implements OnInit {


  constructor(
    private queryResource: QueryResourceService
  ) { }

  uoms: UOMDTO[] = [
    {description: 'Kilogram', iDPcode: 'ACD128', unit: 'KG'},
    {description: 'Litres', iDPcode: 'ACD127', unit: 'L'},
    {description: 'Units', iDPcode: 'ACD126', unit: 'Units'},
  ];

  ngOnInit() {
    // this.queryResource.findAllUomUsingGET({}).subscribe(
    //   res => {
    //     this.uoms = res;
    //   }
    // );
  }

  remove(uom: UOM) {
    this.uoms.splice(
      this.uoms.indexOf(uom),
      1
    );
  }

}
