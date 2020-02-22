import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouplesCounselingComponent } from './couples-counseling.component';

describe('CouplesCounselingComponent', () => {
  let component: CouplesCounselingComponent;
  let fixture: ComponentFixture<CouplesCounselingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouplesCounselingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouplesCounselingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
