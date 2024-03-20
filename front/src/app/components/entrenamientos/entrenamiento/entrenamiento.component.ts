/**
 * @author Marina Laguna
 */
import { Component } from '@angular/core';
import { EntrenamientoService } from '../../../services/entrenamiento.service';
import { Entrenamiento } from '../../../interfaces/entrenamiento';
import { Router, ActivatedRoute } from '@angular/router';
import { Alert } from '../../../interfaces/alert';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { ModalCrearEntreComponent } from '../modal-crear-entre/modal-crear-entre.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModificarEntrenamientoComponent } from '../modificar-entrenamiento/modificar-entrenamiento.component';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-entrenamiento',
  standalone: true,
  imports: [
    AlertComponent, TooltipModule, ToolbarModule, InputTextModule, 
    TableModule, DatePipe, CurrencyPipe, ProgressBarModule, FormsModule, 
    ModalCrearEntreComponent, ToastModule, ConfirmDialogModule, DialogComponent,
    DialogModule, ModificarEntrenamientoComponent
  ],
  templateUrl: './entrenamiento.component.html',
  styleUrl: './entrenamiento.component.css',
  providers: [DialogService]
})

export class EntrenamientoComponent {
  entrenamiento: Entrenamiento;
  alert: Alert;
  arrEntrenamientos: Array<Entrenamiento> = [];
  selectEntrenamientos!: Array<Entrenamiento>;
  searchValue: string = '';
  test?: Entrenamiento;

  ref: DynamicDialogRef | undefined;

  constructor(private authService: AuthService, private entrenamientoService: EntrenamientoService, private router: Router, private route: ActivatedRoute, public dialogService: DialogService){
    this.entrenamiento = {};
    this.alert = new Alert();
  }

  ngOnInit() {
    this.entrenamientoService.entrenamientoCreated.subscribe(() => {
       this.listarEntrenamientos();
    });
    this.listarEntrenamientos();
   }

  openDialog(id?: number) {
    if (typeof id === 'number') {
       this.entrenamientoService.getEntrenamientoId({ id: id }).subscribe({
         next: (entrenamiento: any | undefined) => {
           if (entrenamiento && entrenamiento.id) {
             this.ref = this.dialogService.open(ModificarEntrenamientoComponent, {
               header: 'Editar Entrenamiento',
               modal: true,
               breakpoints: {
                 '960px': '75vw',
                 '640px': '90vw'
               },
               data: {
                 entrenamiento: entrenamiento,
                 dialogRef: this.ref
               },
             });
           }
         },
       });
    }
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
        throw err;
      },
    });
  }

  deleteEntrenamiento(entrenamiento: Entrenamiento) {
    this.entrenamientoService.deleteEntrenamientos(entrenamiento).subscribe({
      next: (deletedEntrenamiento: Entrenamiento | undefined) => {
        if (deletedEntrenamiento) {
          this.arrEntrenamientos = this.arrEntrenamientos.filter(e => e.id !== entrenamiento.id);
        } 
      },
      error: (err) => {
        throw err;
      }
    });
  }

  consultarEntre(id?: number): void{
    if (typeof id === 'number'){
      this.router.navigate(['/training', id]);
    }
  }
}