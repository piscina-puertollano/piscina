import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInsertarCategoriaComponent } from './formulario-insertar-categoria.component';

describe('FormularioInsertarCategoriaComponent', () => {
  let component: FormularioInsertarCategoriaComponent;
  let fixture: ComponentFixture<FormularioInsertarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInsertarCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioInsertarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
