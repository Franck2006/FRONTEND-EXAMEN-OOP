import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPreloader } from './common-preloader';

describe('CommonPreloader', () => {
  let component: CommonPreloader;
  let fixture: ComponentFixture<CommonPreloader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonPreloader],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonPreloader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
