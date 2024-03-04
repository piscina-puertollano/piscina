/**
 * @author Marina Laguna
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Ejercicios } from '../../../interfaces/ejercicios';
import { Entrenamiento } from '../../../interfaces/entrenamiento';
import { TiposEjercicios } from '../../../interfaces/tipos-ejercicios';
import { EjerciciosService } from '../../../services/ejercicios.service';
import { EntrenamientoService } from '../../../services/entrenamiento.service';
import { AuthService } from '../../../services/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-entrenamiento',
  standalone: true,
  imports: [
    FormsModule, CommonModule, ToastModule
  ],
  templateUrl: './crear-entrenamiento.component.html',
  styleUrls: ['./crear-entrenamiento.component.css']
})
export class CrearEntrenamientoComponent {
  entrenamiento: Entrenamiento = { nombre: '', descripcion: '', ejercicios: [] };
  tipo: TiposEjercicios = {id: 0, nombre: '', descripcion:''}
  tiposEjercicios: TiposEjercicios[] = [];
  nuevoEjercicio: Ejercicios = { descripcion: '', idTipo:  0 };
  dialogRef: DynamicDialogRef

  ref: DynamicDialogRef | undefined;

  constructor(private authService: AuthService, private entrenamientoService: EntrenamientoService,private ejerciciosService: EjerciciosService, private router: Router, private messageService: MessageService, dialogRef: DynamicDialogRef) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(){
    this.cargarTiposEjercicio();
  }

  insertEntrenamiento() {
    this.entrenamientoService.insertEntrenamiento(this.entrenamiento).subscribe({
      next: (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Entrenamiento creado'
        });

        this.dialogRef.close();
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
    this.nuevoEjercicio = { descripcion: '', idTipo:  0 };
  }
}