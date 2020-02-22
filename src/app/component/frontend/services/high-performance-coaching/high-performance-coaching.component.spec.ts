import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighPerformanceCoachingComponent } from './high-performance-coaching.component';

describe('HighPerformanceCoachingComponent', () => {
  let component: HighPerformanceCoachingComponent;
  let fixture: ComponentFixture<HighPerformanceCoachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighPerformanceCoachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighPerformanceCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
