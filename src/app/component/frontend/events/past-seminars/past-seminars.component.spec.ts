import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSeminarsComponent } from './past-seminars.component';

describe('PastSeminarsComponent', () => {
  let component: PastSeminarsComponent;
  let fixture: ComponentFixture<PastSeminarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastSeminarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSeminarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
