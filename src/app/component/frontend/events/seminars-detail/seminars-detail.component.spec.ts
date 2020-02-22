import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarsDetailComponent } from './seminars-detail.component';

describe('SeminarsDetailComponent', () => {
  let component: SeminarsDetailComponent;
  let fixture: ComponentFixture<SeminarsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeminarsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
