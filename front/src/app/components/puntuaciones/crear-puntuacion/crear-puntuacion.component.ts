import { Component } from '@angular/core';
import { Puntuacion } from '../../../interfaces/puntuacion';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PuntuacionService } from '../../../services/puntuacion.service';
import { MessageService } from 'primeng/api';
import { DialogComponent } from '../../../utils/dialog/dialog.component';

@Component({
  selector: 'app-crear-puntuacion',
  standalone: true,
  imports: [DynamicDialogModule],
  templateUrl: './crear-puntuacion.component.html',
  styleUrls: ['./crear-puntuacion.component.css']
})
export class CrearPuntuacionComponent {
  puntuacion: Puntuacion = {nota: 0};
  dialogRef: DynamicDialogRef;

  constructor(dialogRef: DynamicDialogRef, private puntuacionService: PuntuacionService, private messageService: MessageService){
    this.dialogRef = dialogRef;
  }

  insertPuntuacion(puntuacion: Puntuacion) {
    this.puntuacionService.insertPuntuacion(puntuacion).subscribe({
      next: (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Puntuación creada'
        });

        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error al insertar una puntuacion:', err);
      }
    })
  }
}