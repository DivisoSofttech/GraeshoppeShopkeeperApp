import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UomCardComponent } from './uom-card.component';

describe('UomCardComponent', () => {
  let component: UomCardComponent;
  let fixture: ComponentFixture<UomCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UomCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
