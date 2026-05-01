import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPannel } from './content-pannel';

describe('ContentPannel', () => {
  let component: ContentPannel;
  let fixture: ComponentFixture<ContentPannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPannel],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentPannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
