import { Component, Input } from '@angular/core';
import { Puntuacion } from '../../../interfaces/puntuacion';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PuntuacionService } from '../../../services/puntuacion.service';
import { MessageService } from 'primeng/api';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { FormsModule } from '@angular/forms';

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
  /*   dialogRef: DynamicDialogRef;
 */
  constructor(dialogRef: DynamicDialogRef, private puntuacionService: PuntuacionService, private messageService: MessageService, public config: DynamicDialogConfig){
    this.socioId = this.config.data.puntuacion

    /*     this.dialogRef = dialogRef;
 */  }

  insertPuntuacion(puntuacion: any) {
    this.socioId = this.config.data.socioId
    console.log(this.socioId)
    puntuacion = {
      userId: this.socioId,
      nota: this.puntuacion.nota,
    }
    console.log(puntuacion)
    this.puntuacionService.insertPuntuacion(puntuacion).subscribe({
      next: (puntuacion) => {
        console.log(puntuacion)
        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Puntuación creada'
        });

/*         this.dialogRef.close();
 */      },
      error: (err) => {
        console.error('Error al insertar una puntuacion:', err);
      }
    })
  }
}