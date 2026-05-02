import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserRole } from './update-user-role';

describe('UpdateUserRole', () => {
  let component: UpdateUserRole;
  let fixture: ComponentFixture<UpdateUserRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserRole],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserRole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
