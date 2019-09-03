import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDairyPage } from './stock-dairy.page';

describe('StockDairyPage', () => {
  let component: StockDairyPage;
  let fixture: ComponentFixture<StockDairyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDairyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDairyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
