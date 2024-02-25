/**
 * author: Marina Laguna
 */
import { Component } from '@angular/core';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Entrenamiento } from '../interfaces/entrenamiento';
import { Router, provideRouter } from '@angular/router';
import { Alert } from '../interfaces/alert';
import { AlertComponent } from '../utils/alert/alert.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../utils/modal/modal.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogComponent } from '../utils/dialog/dialog.component';

@Component({
  selector: 'app-entrenamiento',
  standalone: true,
  imports: [AlertComponent, TooltipModule, ToolbarModule, InputTextModule, TableModule, DatePipe, CurrencyPipe, ProgressBarModule, FormsModule, ModalComponent, ToastModule, ConfirmDialogModule, DialogComponent],
  templateUrl: './entrenamiento.component.html',
  styleUrl: './entrenamiento.component.css'
})

export class EntrenamientoComponent {
  entrenamiento: Entrenamiento;
  alert: Alert;
  arrEntrenamientos: Array<Entrenamiento> = [];
  selectEntrenamientos!: Array<Entrenamiento>;
  searchValue: string = ''

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
      console.error('Id no válido: ', id)
    }
  }

  navCrearEntre(){
    this.router.navigate(['crear-entrenamiento']);
  }

  consultarEntre(id?: number): void{
    if (typeof id === 'number'){
      this.router.navigate(['/consultar-entrenamiento', id]);
    } else {
      console.error('Id no válido: ', id);
    }
  }
}