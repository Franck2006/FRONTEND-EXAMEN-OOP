import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePannel } from './profile-pannel';

describe('ProfilePannel', () => {
  let component: ProfilePannel;
  let fixture: ComponentFixture<ProfilePannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePannel],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
