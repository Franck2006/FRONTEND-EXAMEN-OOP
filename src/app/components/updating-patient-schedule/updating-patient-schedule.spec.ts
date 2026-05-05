import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingPatientSchedule } from './updating-patient-schedule';

describe('UpdatingPatientSchedule', () => {
  let component: UpdatingPatientSchedule;
  let fixture: ComponentFixture<UpdatingPatientSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatingPatientSchedule],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatingPatientSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
