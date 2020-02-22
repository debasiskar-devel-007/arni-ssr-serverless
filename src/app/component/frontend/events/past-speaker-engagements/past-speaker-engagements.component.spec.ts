import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSpeakerEngagementsComponent } from './past-speaker-engagements.component';

describe('PastSpeakerEngagementsComponent', () => {
  let component: PastSpeakerEngagementsComponent;
  let fixture: ComponentFixture<PastSpeakerEngagementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastSpeakerEngagementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSpeakerEngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
