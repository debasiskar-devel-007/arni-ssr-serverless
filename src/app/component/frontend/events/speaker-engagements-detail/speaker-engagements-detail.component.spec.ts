import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerEngagementsDetailComponent } from './speaker-engagements-detail.component';

describe('SpeakerEngagementsDetailComponent', () => {
  let component: SpeakerEngagementsDetailComponent;
  let fixture: ComponentFixture<SpeakerEngagementsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerEngagementsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerEngagementsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
