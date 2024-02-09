import { Component } from '@angular/core';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Alert } from '../interfaces/alert';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-entrenamiento',
  standalone: true,
  imports: [AlertComponent, FormsModule],
  templateUrl: './modificar-entrenamiento.component.html',
  styleUrl: './modificar-entrenamiento.component.css'
})
export class ModificarEntrenamientoComponent {
  entrenamiento: Entrenamiento;
  alert: Alert;
  arrEntrenamientos: Array<Entrenamiento> = [];

  constructor(private entrenamientoService: EntrenamientoService, private router: Router){
    this.entrenamiento = {};
    this.alert = new Alert();
  }

  updateEntrenamiento(){
    this.entrenamientoService.updateEntrenamientos(this.entrenamiento).subscribe({
      next: (entrenamiento: any | undefined) => {
        this.entrenamiento = entrenamiento
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getEntrenamiento() {
    this.entrenamientoService.getEntrenamientoId({ id: this.entrenamiento.id }).subscribe({
      next: (entrenamiento: any | undefined) => {
        console.log(entrenamiento);
        if (!entrenamiento || entrenamiento.length ===  0) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'Entrenamiento no encontrado';
        } else {
          this.alert.show = false;
          this.entrenamiento = entrenamiento[0]; 
        }
      },
      error: (err) => {
        console.log(err);
        this.alert.show = true;
        this.alert.header = 'Error';
        this.alert.message = 'Ha ocurrido un error al intentar obtener el entrenamiento';
      }
    });
  }
}