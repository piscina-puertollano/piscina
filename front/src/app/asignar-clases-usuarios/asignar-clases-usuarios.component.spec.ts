import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarClasesUsuariosComponent } from './asignar-clases-usuarios.component';

describe('AsignarClasesUsuariosComponent', () => {
  let component: AsignarClasesUsuariosComponent;
  let fixture: ComponentFixture<AsignarClasesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarClasesUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarClasesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
