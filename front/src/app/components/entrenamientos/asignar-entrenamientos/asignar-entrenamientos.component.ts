/**
 * @author Marina Laguna
 */
import { Component, Input } from '@angular/core';
import { Entrenamiento } from '../../../interfaces/entrenamiento';
import { Alert } from '../../../interfaces/alert';
import { AuthService } from '../../../services/auth.service';
import { EntrenamientoService } from '../../../services/entrenamiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { ModalCrearEntreComponent } from '../modal-crear-entre/modal-crear-entre.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ModificarEntrenamientoComponent } from '../modificar-entrenamiento/modificar-entrenamiento.component';
import { Puntuacion } from '../../../interfaces/puntuacion';
import { PuntuacionService } from '../../../services/puntuacion.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-asignar-entrenamientos',
  standalone: true,
  imports: [
    AlertComponent, TooltipModule, ToolbarModule, InputTextModule,
    TableModule, DatePipe, CurrencyPipe, ProgressBarModule, FormsModule,
    ModalCrearEntreComponent, ToastModule, ConfirmDialogModule, DialogComponent,
    DialogModule, ModificarEntrenamientoComponent
  ],
  templateUrl: './asignar-entrenamientos.component.html',
  styleUrl: './asignar-entrenamientos.component.css'
})
export class AsignarEntrenamientosComponent {
  entrenamiento: Entrenamiento;
  alert: Alert;
  arrEntrenamientos: Array<Entrenamiento> = [];
  selectEntrenamientos!: Array<Entrenamiento>;
  searchValue: string = '';
  test?: Entrenamiento;
  @Input() socioId!: number;
  @Input() nota!: number

  constructor(private authService: AuthService, private entrenamientoService: EntrenamientoService, private puntuacionService: PuntuacionService, private router: Router, private route: ActivatedRoute, public config: DynamicDialogConfig){
    this.entrenamiento = {};
    this.alert = new Alert();
  }

  ngOnInit(){
    this.socioId = this.config.data.socioId
    this.nota = this.config.data.nota
    this.listarEntrenamientos();
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

  async asignar(idEntrenamiento: number) {
    try {
       const puntuacion = await this.puntuacionService.getPuntuacionEntrenador(this.socioId).toPromise();
       if (!puntuacion) {
         console.error('No se encontró la puntuación para el socio.');
         return;
       }
   
       const updatedPuntuacion: Puntuacion = {
         id: puntuacion.id,
         userId: this.socioId,
         nota: this.nota,
         idEntrenamiento: idEntrenamiento 
       };
   
       console.log(updatedPuntuacion);
   
       this.puntuacionService.updatePuntuacion(updatedPuntuacion).subscribe({
         next: (updatedPuntuacion) => {
           console.log('Puntuación actualizada:', updatedPuntuacion);
         },
         error: (err) => {
           console.error('Error al actualizar la puntuación:', err);
         }
       });
    } catch (error) {
       console.error('Error al obtener o actualizar la puntuación:', error);
    }
   }
}