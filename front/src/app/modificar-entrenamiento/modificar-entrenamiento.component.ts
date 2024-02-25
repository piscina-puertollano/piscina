/**
 * author: Marina Laguna
 */
import { Component } from '@angular/core';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Alert } from '../interfaces/alert';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjerciciosService } from '../services/ejercicios.service';
import { Ejercicios } from '../interfaces/ejercicios';
import { TiposEjercicios } from '../interfaces/tipos-ejercicios';

@Component({
  selector: 'app-modificar-entrenamiento',
  standalone: true,
  imports: [AlertComponent, FormsModule, CommonModule],
  templateUrl: './modificar-entrenamiento.component.html',
  styleUrl: './modificar-entrenamiento.component.css'
})
export class ModificarEntrenamientoComponent {
  entrenamiento: Entrenamiento;
  alert: Alert;
  arrEntrenamientos: Array<Entrenamiento> = [];
  tiposEjercicios: TiposEjercicios[] = [];

  constructor(private entrenamientoService: EntrenamientoService, private ejerciciosService: EjerciciosService,private router: Router, private route: ActivatedRoute){
    this.entrenamiento = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const entrenamientoId = params['id']; 
      this.entrenamiento.id = entrenamientoId;
      this.getEntrenamiento();
    });

    this.ejerciciosService.getTiposEjercicios().subscribe(tipos => {
      console.log('Tipos de ejercicios:', tipos);
      if (Array.isArray(tipos)) {
        // Extraer la propiedad `Tipo` de cada `Ejercicio`, excluir `undefined`, y asegurarse de que el resultado sea tratado como `TiposEjercicios[]`
        this.tiposEjercicios = tipos.map(ejercicio => ejercicio.Tipo).filter(tipo => tipo !== undefined) as TiposEjercicios[];
      } else {
        console.error('Los tipos de ejercicios recibidos no son un array:', tipos);
        this.tiposEjercicios = []; // Inicializar como un array vacío si `tipos` es undefined
      }
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
        console.log('Datos del entrenamiento:', response)
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

  getNombreTipoEjercicio(idTipo: number): string {
  const tipo = this.tiposEjercicios.find(tipo => tipo.id === idTipo);
  return tipo && tipo.hasOwnProperty('nombre') ? tipo.nombre : '';
}
}