import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Clase } from '../../interfaces/clase';
import { Alert } from '../../interfaces/alert';
import { Router } from '@angular/router';
import { ClaseService } from '../../services/clase.service';
import { Categoria } from '../../interfaces/categoria';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-crear-clase',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './crear-clase.component.html',
  styleUrl: './crear-clase.component.css'
})
export class CrearClaseComponent implements OnInit{
  clase: Clase = new Clase();
  nuevaClase: Clase = { nombre: ''};
  alert: Alert;

  arrCategorias: Array<Categoria> = [];
  selectedCategoria: Categoria  = new Categoria();

  constructor(private service: ClaseService, private CategoriaService: CategoriaService, private router: Router) {
    this.clase = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.allCategorias();
  }

  allCategorias() {
    this.CategoriaService.getCategorias().subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria);
        if (categoria.status >=  400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion. Póngase en contacto con un administrador.';
        } else {
          this.arrCategorias = categoria; 
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  agregarClase() {
    this.nuevaClase.nombre = this.clase.nombre
    console.log(this.nuevaClase)
    this.service.agregarClase(this.nuevaClase).subscribe({
      next: (nuevaClase: Clase) => {
        console.log('Clase agregada exitosamente:', nuevaClase);
        location.reload();
      },
      error: (err) => {
        console.error('Error al agregar la clase:', err);
      }
    });
  }
}
