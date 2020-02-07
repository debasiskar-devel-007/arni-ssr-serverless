import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDevelopmentCoachingComponent } from './personal-development-coaching.component';

describe('PersonalDevelopmentCoachingComponent', () => {
  let component: PersonalDevelopmentCoachingComponent;
  let fixture: ComponentFixture<PersonalDevelopmentCoachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDevelopmentCoachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDevelopmentCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
