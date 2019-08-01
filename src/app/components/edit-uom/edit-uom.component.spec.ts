import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUomComponent } from './edit-uom.component';

describe('EditUomComponent', () => {
  let component: EditUomComponent;
  let fixture: ComponentFixture<EditUomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUomComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
