import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDairyViewComponent } from './stock-dairy-view.component';

describe('StockDairyViewComponent', () => {
  let component: StockDairyViewComponent;
  let fixture: ComponentFixture<StockDairyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDairyViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDairyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
