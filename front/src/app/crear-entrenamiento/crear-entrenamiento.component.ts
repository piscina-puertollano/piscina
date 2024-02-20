/**
 * author: Marina Laguna
 */
import { Component } from '@angular/core';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-entrenamiento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-entrenamiento.component.html',
  styleUrls: ['./crear-entrenamiento.component.css']
})
export class CrearEntrenamientoComponent {
  entrenamiento: Entrenamiento = {}; 

  constructor(private entrenamientoService: EntrenamientoService, private router: Router ) {
    this.entrenamiento = {};
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
}