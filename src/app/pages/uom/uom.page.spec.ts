import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UomPage } from './uom.page';

describe('UomPage', () => {
  let component: UomPage;
  let fixture: ComponentFixture<UomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
