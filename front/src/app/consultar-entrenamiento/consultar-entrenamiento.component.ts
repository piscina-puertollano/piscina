import { Component } from '@angular/core';
import { AlertComponent } from '../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Alert } from '../interfaces/alert';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ejercicios } from '../interfaces/ejercicios';

@Component({
  selector: 'app-consultar-entrenamiento',
  standalone: true,
  imports: [AlertComponent, FormsModule, CommonModule],
  templateUrl: './consultar-entrenamiento.component.html',
  styleUrl: './consultar-entrenamiento.component.css'
})
export class ConsultarEntrenamientoComponent {
  entrenamiento: Entrenamiento;
  alert: Alert;
  arrEntrenamientos: Array<Entrenamiento> = [];

  constructor(private entrenamientoService: EntrenamientoService, private router: Router, private route: ActivatedRoute){
    this.entrenamiento = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const entrenamientoId = params['id']; 
      this.entrenamiento.id = entrenamientoId;
      this.getEntrenamiento();
    });
  }

  updateEntrenamiento(){
    this.entrenamientoService.updateEntrenamientos(this.entrenamiento).subscribe({
      next: (entrenamiento: any | undefined) => {
        this.entrenamiento = entrenamiento;
        this.router.navigate(['/entrenamientos']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getEntrenamiento() {
    this.entrenamientoService.getEntrenamientoId({ id: this.entrenamiento.id }).subscribe({
      next: (response: any) => {
        if (response && !Array.isArray(response)) {
          this.entrenamiento = response; 
        } else {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'Entrenamiento no encontrado';
          this.entrenamiento = {}; 
        }
      },
      error: (err) => {
        console.error('Error al obtener el entrenamiento:', err);
        this.alert.show = true;
        this.alert.header = 'Error';
        this.alert.message = 'Ha ocurrido un error al intentar obtener el entrenamiento';
      }
    });
  }
}
