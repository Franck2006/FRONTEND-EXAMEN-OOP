import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLandingPage } from './welcome-landing-page';

describe('WelcomeLandingPage', () => {
  let component: WelcomeLandingPage;
  let fixture: ComponentFixture<WelcomeLandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLandingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeLandingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
