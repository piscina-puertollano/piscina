import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioModificarEventoComponent } from './formulario-modificar-evento.component';

describe('FormularioModificarEventoComponent', () => {
  let component: FormularioModificarEventoComponent;
  let fixture: ComponentFixture<FormularioModificarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioModificarEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioModificarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
