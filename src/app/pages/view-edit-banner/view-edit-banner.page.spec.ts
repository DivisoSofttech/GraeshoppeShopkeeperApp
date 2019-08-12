import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditBannerPage } from './view-edit-banner.page';

describe('ViewEditBannerPage', () => {
  let component: ViewEditBannerPage;
  let fixture: ComponentFixture<ViewEditBannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditBannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditBannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
