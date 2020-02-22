import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerEngagementsComponent } from './speaker-engagements.component';

describe('SpeakerEngagementsComponent', () => {
  let component: SpeakerEngagementsComponent;
  let fixture: ComponentFixture<SpeakerEngagementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerEngagementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerEngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
