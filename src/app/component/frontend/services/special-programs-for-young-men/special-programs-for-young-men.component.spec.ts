import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialProgramsForYoungMenComponent } from './special-programs-for-young-men.component';

describe('SpecialProgramsForYoungMenComponent', () => {
  let component: SpecialProgramsForYoungMenComponent;
  let fixture: ComponentFixture<SpecialProgramsForYoungMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialProgramsForYoungMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialProgramsForYoungMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
