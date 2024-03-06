import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Alert } from '../../../interfaces/alert';
import { Entrenamiento } from '../../../interfaces/entrenamiento';
import { TiposEjercicios } from '../../../interfaces/tipos-ejercicios';
import { EjerciciosService } from '../../../services/ejercicios.service';
import { EntrenamientoService } from '../../../services/entrenamiento.service';
import { AlertComponent } from '../../../utils/alert/alert.component';

@Component({
 selector: 'app-modificar-entrenamiento',
 standalone: true,
 imports: [AlertComponent, FormsModule, CommonModule],
 templateUrl: './modificar-entrenamiento.component.html',
 styleUrls: ['./modificar-entrenamiento.component.css']
})
export class ModificarEntrenamientoComponent implements OnInit {
 alert: Alert;
 arrEntrenamientos: Array<Entrenamiento> = [];
 tiposEjercicios: TiposEjercicios[] = [];
 @Input() entrenamiento!: Entrenamiento;
 dialogRef: DynamicDialogRef

 ref: DynamicDialogRef | undefined;


 constructor(private entrenamientoService: EntrenamientoService, private ejerciciosService: EjerciciosService, private router: Router, private route: ActivatedRoute, public config: DynamicDialogConfig, private messageService: MessageService, dialogRef: DynamicDialogRef) {
    this.alert = new Alert();
    this.dialogRef = dialogRef;
 }

 ngOnInit(): void {
  this.entrenamiento = this.config.data.entrenamiento
    if (this.entrenamiento && this.entrenamiento.id) {
      this.getEntrenamiento();
    } else {
      console.error('El entrenamiento o su ID no se proporcionó correctamente.');
    }

    this.ejerciciosService.getTiposEjercicios().subscribe(tipos => {
      if (Array.isArray(tipos)) {
        this.tiposEjercicios = tipos.map(ejercicio => ejercicio.Tipo).filter(tipo => tipo !== undefined) as TiposEjercicios[];
      } else {
        console.error('Los tipos de ejercicios recibidos no son un array:', tipos);
        this.tiposEjercicios = [];
      }
    });
 }

 updateEntrenamiento() {
  if (!this.entrenamiento.nombre || this.entrenamiento.nombre.trim() === '') {
    this.messageService.add({
      severity: 'error',
      summary: 'Error de validación',
      detail: 'El nombre del entrenamiento es requerido.'
    });
    return;
  }

  if (!this.entrenamiento.descripcion || this.entrenamiento.descripcion.trim() === '') {
    this.messageService.add({
      severity: 'error',
      summary: 'Error de validación',
      detail: 'La descripción del entrenamiento es requerida.'
    });
    return;
  }
    this.entrenamientoService.updateEntrenamientos(this.entrenamiento).subscribe({
      next: (entrenamiento: any | undefined) => {
        this.entrenamiento = entrenamiento;
        this.router.navigate(['/training']);

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Entrenamiento actualizado',
        });

        this.dialogRef.close();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.error('Error al modificar los entrenamientos', err);
      }
    });
 }

 getEntrenamiento() {
    this.entrenamientoService.getEntrenamientoId({ id: this.entrenamiento.id }).subscribe({
      next: (response: any) => {
        if (response && !Array.isArray(response)) {
          this.entrenamiento = response;
          console.log(this.entrenamiento)
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