import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDairyCardComponent } from './stock-dairy-card.component';

describe('StockDairyCardComponent', () => {
  let component: StockDairyCardComponent;
  let fixture: ComponentFixture<StockDairyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDairyCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDairyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
