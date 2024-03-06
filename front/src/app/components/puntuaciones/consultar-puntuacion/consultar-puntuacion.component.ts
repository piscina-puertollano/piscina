/**
 * @author Marina Laguna
 */
import { Component } from '@angular/core';
import { PuntuacionService } from '../../../services/puntuacion.service';
import { ActivatedRoute } from '@angular/router';
import { Puntuacion } from '../../../interfaces/puntuacion';
import { Entrenamiento } from '../../../interfaces/entrenamiento';
import { EntrenamientoService } from '../../../services/entrenamiento.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-puntuacion',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './consultar-puntuacion.component.html',
  styleUrl: './consultar-puntuacion.component.css'
})
export class ConsultarPuntuacionComponent {
  nota: number | undefined;
  entrenamientoAsignado: Entrenamiento | null = null;
  socios: any[] = [];
  selectedSocioId: number | null = null;

  constructor(private puntuacionService: PuntuacionService, private entrenamientoService: EntrenamientoService, private route: ActivatedRoute) {
    const mainObject = JSON.parse(localStorage.getItem('user')! as string);
    const user = mainObject.user; 
    const socioId = user ? user.id : null;
   
    if (socioId) {
       this.getPuntuacionSocio(socioId);
       this.getSociosTutor(socioId)
    } 
   }

   getPuntuacionSocio(socioId: number) {
    this.puntuacionService.getPuntuacionSocio(socioId).subscribe(
       (puntuacion: Puntuacion | undefined) => {
         if (puntuacion && puntuacion.puntuacion) {
           this.nota = puntuacion.puntuacion.nota; 
           if (puntuacion.puntuacion.idEntrenamiento !== null && puntuacion.puntuacion.idEntrenamiento !== undefined) {
             this.getEntrenamientoAsignado(puntuacion.puntuacion.idEntrenamiento);
           }
         } 
       },
       (error) => {
         throw error;
       }
    );
   }

  getEntrenamientoAsignado(idEntrenamiento: number) {
    this.entrenamientoService.getEntrenamientoAsignado(idEntrenamiento).subscribe(
      (entrenamiento: Entrenamiento | undefined) => {
        if (entrenamiento) {
          this.entrenamientoAsignado = entrenamiento;
        }
      },
      (error) => {
        throw error;
      }
    );
  }

  getSociosTutor(tutorId: number) {
    this.puntuacionService.getSociosTutor(tutorId).subscribe(
       (socios) => {
         this.socios = socios;
       },
       (error) => {
         throw error;
       }
    );
   }

   socioSeleccionado(socioId: number){
    this.selectedSocioId = socioId;
    this.getPuntuacionSocio(socioId)
   }

   recargar(){
    window.location.reload()
   }
}
