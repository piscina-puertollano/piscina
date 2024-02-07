import { Component, OnInit } from '@angular/core';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Router } from '@angular/router';
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
        console.log(entrenamiento)
        if (entrenamiento.status >= 400){
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 
          'No se han podido cargar los entrenamientos. Póngase en contacto con un administrador.';
        } else {
          this.arrEntrenamientos = entrenamiento;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}