import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInsertarComponent } from './formulario-insertar.component';

describe('FormularioInsertarComponent', () => {
  let component: FormularioInsertarComponent;
  let fixture: ComponentFixture<FormularioInsertarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInsertarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioInsertarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
