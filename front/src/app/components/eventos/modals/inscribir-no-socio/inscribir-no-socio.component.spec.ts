import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirNoSocioComponent } from './inscribir-no-socio.component';

describe('InscribirNoSocioComponent', () => {
  let component: InscribirNoSocioComponent;
  let fixture: ComponentFixture<InscribirNoSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscribirNoSocioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscribirNoSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
