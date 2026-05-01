import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApponitementPannel } from './apponitement-pannel';

describe('ApponitementPannel', () => {
  let component: ApponitementPannel;
  let fixture: ComponentFixture<ApponitementPannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApponitementPannel],
    }).compileComponents();

    fixture = TestBed.createComponent(ApponitementPannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
