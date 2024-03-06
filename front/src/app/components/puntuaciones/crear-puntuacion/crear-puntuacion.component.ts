/**
 * @author Marina Laguna
 */
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Puntuacion } from '../../../interfaces/puntuacion';
import { PuntuacionService } from '../../../services/puntuacion.service';

@Component({
  selector: 'app-crear-puntuacion',
  standalone: true,
  imports: [DynamicDialogModule, FormsModule],
  templateUrl: './crear-puntuacion.component.html',
  styleUrls: ['./crear-puntuacion.component.css']
})
export class CrearPuntuacionComponent {
  puntuacion: Puntuacion = {nota: 0,};
  @Input() socioId!: number;
  dialogRef: DynamicDialogRef;
  asignarEntre: boolean = false;

  constructor(dialogRef: DynamicDialogRef, private puntuacionService: PuntuacionService, private messageService: MessageService, public config: DynamicDialogConfig, private router: Router){
    this.socioId = this.config.data.puntuacion
    this.dialogRef = dialogRef;
  }

  insertPuntuacion(puntuacion: any) {
    if (typeof this.puntuacion.nota !== 'number' || this.puntuacion.nota === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'La nota debe ser un número y no puede ser 0.'
      });
      return;
    }

    this.socioId = this.config.data.socioId
    puntuacion = {
      userId: this.socioId,
      nota: this.puntuacion.nota,
    }

    this.puntuacionService.insertPuntuacion(puntuacion).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Puntuación creada'
        });

        this.dialogRef.close();
        setTimeout(() =>{
          window.location.reload()
        }, 2000);
      },
      error: (err) => {
        throw err;
      }
    });
  }
}