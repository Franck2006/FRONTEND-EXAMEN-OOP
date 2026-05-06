import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMessage } from './read-message';

describe('ReadMessage', () => {
  let component: ReadMessage;
  let fixture: ComponentFixture<ReadMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
