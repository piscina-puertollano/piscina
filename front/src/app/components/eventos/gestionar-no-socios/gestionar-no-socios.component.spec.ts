import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarNoSociosComponent } from './gestionar-no-socios.component';

describe('GestionarNoSociosComponent', () => {
  let component: GestionarNoSociosComponent;
  let fixture: ComponentFixture<GestionarNoSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarNoSociosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarNoSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
