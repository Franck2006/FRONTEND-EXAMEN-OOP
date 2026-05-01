import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPannel } from './dashboard-pannel';

describe('DashboardPannel', () => {
  let component: DashboardPannel;
  let fixture: ComponentFixture<DashboardPannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPannel],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
