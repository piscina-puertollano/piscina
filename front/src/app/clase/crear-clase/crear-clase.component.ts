/**
 * author: Manuel Garcia
 */
import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Clase } from '../../interfaces/clase';
import { Alert } from '../../interfaces/alert';
import { Router, RouterLink } from '@angular/router';
import { ClaseService } from '../../services/clase.service';
import { Categoria } from '../../interfaces/categoria';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crear-clase',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DropdownModule, ButtonModule, RouterLink],
  templateUrl: './crear-clase.component.html',
  styleUrl: './crear-clase.component.css',
})
export class CrearClaseComponent implements OnInit {
  clase: Clase;
  alert: Alert;
 
  categoriaSelecionada: Categoria = new Categoria();
  dia: any;
  horaInicio: string = ''
  horaFin: string = ''
  descripcion: string = ''

  arrClases: Clase[] = [];

  diasSemana = [
    { label: 'Lunes', value: 'Lunes' },
    { label: 'Martes', value: 'Martes' },
    { label: 'Miércoles', value: 'Miercoles' },
    { label: 'Jueves', value: 'Jueves' },
    { label: 'Viernes', value: 'Viernes' },
  ];
  arrCategorias: Array<Categoria> = [];
  selectedCategoria: Categoria = new Categoria();
  

  constructor(
    private service: ClaseService,
    private CategoriaService: CategoriaService,
    private router: Router
  ) {
    this.clase = {};
    this.alert = new Alert();
    this.horaFin = ''
    this.horaInicio = ''
  }

  ngOnInit(): void {
    this.allCategorias();
  }

  allCategorias() {
    this.CategoriaService.getCategorias().subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria);
        if (categoria.status >= 400) {
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
    console.log(this.horaInicio)
    let nuevaClase = {
      id_categoria: this.categoriaSelecionada.id,
      nombre: this.dia.value,
      hora_inicio: this.horaInicio,
      hora_fin: this.horaFin,
      descripcion: this.descripcion
    };
  
    this.service.agregarClase(nuevaClase).subscribe({
      next: (resultado: any) => {
        console.log(resultado);
        if (resultado.status >=  400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se ha podido insertar la nueva categoría. Póngase en contacto con un administrador.';
        } else {
          this.allCategorias();
        }
      },
      error: (err) => {
        console.log(err);
        this.alert.show = true;
        this.alert.header = 'Error';
        this.alert.message =
          'Ha ocurrido un error al intentar insertar la nueva categoría. Por favor, intente de nuevo más tarde.';
      },
    });
  }  
}
