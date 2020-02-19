import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastWorkshopsComponent } from './past-workshops.component';

describe('PastWorkshopsComponent', () => {
  let component: PastWorkshopsComponent;
  let fixture: ComponentFixture<PastWorkshopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastWorkshopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
