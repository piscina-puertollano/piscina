import { Component } from '@angular/core';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Router, provideRouter } from '@angular/router';
import { Alert } from '../interfaces/alert';
import { AlertComponent } from '../utils/alert/alert.component';

@Component({
  selector: 'app-entrenamiento',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './entrenamiento.component.html',
  styleUrl: './entrenamiento.component.css'
})

export class EntrenamientoComponent {
  entrenamiento: Entrenamiento;
  alert: Alert;
  arrEntrenamientos: Array<Entrenamiento> = [];

  constructor(private entrenamientoService: EntrenamientoService, private router: Router){
    this.entrenamiento = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.listarEntrenamientos()
  }

  listarEntrenamientos() {
    this.entrenamientoService.getEntrenamientos().subscribe({
      next: (entrenamiento: any | undefined) => {
  
        if (Array.isArray(entrenamiento)) {  
          this.arrEntrenamientos = entrenamiento;
        } else {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'No se han podido cargar los entrenamientos. Póngase en contacto con un administrador.';
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteEntrenamiento(entrenamiento: Entrenamiento) {
    this.entrenamientoService.deleteEntrenamientos(entrenamiento).subscribe({
      next: (deletedEntrenamiento: Entrenamiento | undefined) => {
        if (deletedEntrenamiento) {
          this.arrEntrenamientos = this.arrEntrenamientos.filter(e => e.id !== entrenamiento.id);
        } else {
          console.error('El entrenamiento no pudo ser eliminado.');
        }
      },
      error: (err) => {
        console.error('Error al eliminar el entrenamiento:', err);
      }
    });
  }

  navModificarEntre(id?: number): void {
    if (typeof id === 'number'){
      this.router.navigate(['/modificar-entrenamiento', id]);
    } else {
      console.error('Id de entrenamiento no válido: ', id)
    }
  }

  navCrearEntre(){
    this.router.navigate(['crear-entrenamiento']);
  }
}