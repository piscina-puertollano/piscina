import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostarParticipantesComponent } from './mostar-participantes.component';

describe('MostarParticipantesComponent', () => {
  let component: MostarParticipantesComponent;
  let fixture: ComponentFixture<MostarParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostarParticipantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostarParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
