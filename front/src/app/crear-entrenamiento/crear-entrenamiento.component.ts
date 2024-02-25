/**
 * author: Marina Laguna
 */
import { Component } from '@angular/core';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ejercicios } from '../interfaces/ejercicios';
import { CommonModule } from '@angular/common';
import { EjerciciosService } from '../services/ejercicios.service';
import { TiposEjercicios } from '../interfaces/tipos-ejercicios';

@Component({
  selector: 'app-crear-entrenamiento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-entrenamiento.component.html',
  styleUrls: ['./crear-entrenamiento.component.css']
})
export class CrearEntrenamientoComponent {
  entrenamiento: Entrenamiento = { nombre: '', descripcion: '', ejercicios: [] };
  tiposEjercicios: TiposEjercicios[] = [];
  nuevoEjercicio: Ejercicios = { descripcion: '', idTipo:  0 };

  constructor(private entrenamientoService: EntrenamientoService,private ejerciciosService: EjerciciosService, private router: Router) {
    this.entrenamiento = { nombre: '', descripcion: '', ejercicios: [] };
    this.cargarTiposEjercicio();
  }

  insertEntrenamiento() {
    this.entrenamientoService.insertEntrenamiento(this.entrenamiento).subscribe({
      next: (newEntrenamiento: Entrenamiento) => {
        this.router.navigate(['/entrenamientos']);
      },
      error: (err) => {
        console.error('Error al insertar el entrenamiento:', err);
      }
    });
  }

  cargarTiposEjercicio(){
    this.ejerciciosService.getTiposEjercicios().subscribe(tipos => {
      this.tiposEjercicios = tipos as TiposEjercicios[];
    }, error => {
      console.error('Error al obtener los tipos de ejercicios:', error);
    })
  }

  agregarEjercicio() {
    if (!this.entrenamiento.ejercicios) {
      this.entrenamiento.ejercicios = [];
    }
    this.entrenamiento.ejercicios.push(this.nuevoEjercicio);
    this.nuevoEjercicio = { descripcion: '', idTipo:  0 }; // Resetear el nuevo ejercicio
  }
}