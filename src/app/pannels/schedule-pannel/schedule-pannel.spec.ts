import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePannel } from './schedule-pannel';

describe('SchedulePannel', () => {
  let component: SchedulePannel;
  let fixture: ComponentFixture<SchedulePannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulePannel],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulePannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
