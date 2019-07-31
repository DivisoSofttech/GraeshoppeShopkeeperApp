import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUomComponent } from './add-uom.component';

describe('AddUomComponent', () => {
  let component: AddUomComponent;
  let fixture: ComponentFixture<AddUomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUomComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
