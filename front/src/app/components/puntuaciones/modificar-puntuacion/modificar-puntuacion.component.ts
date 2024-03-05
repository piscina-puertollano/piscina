import { Component, Input, OnInit } from '@angular/core';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Alert } from '../../../interfaces/alert';
import { Puntuacion } from '../../../interfaces/puntuacion';
import { PuntuacionService } from '../../../services/puntuacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

/**
 * @author Marina Laguna
 */
@Component({
  selector: 'app-modificar-puntuacion',
  standalone: true,
  imports: [AlertComponent, FormsModule, CommonModule],
  templateUrl: './modificar-puntuacion.component.html',
  styleUrl: './modificar-puntuacion.component.css'
})

export class ModificarPuntuacionComponent implements OnInit {
  alert: Alert;
  @Input() puntuacion!: Puntuacion;
  dialogRef: DynamicDialogRef;

  constructor(dialogRef: DynamicDialogRef, private puntuacionService: PuntuacionService, private messageService: MessageService, private router: Router, private route: ActivatedRoute, public config: DynamicDialogConfig){
    this.alert = new Alert();
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
    this.puntuacion = this.config.data.puntuacion
  }

  updateNota(){
    if (!this.puntuacion || !this.puntuacion) {
      this.alert.message = 'No se encuentra el id.';
      return;
    }

    this.puntuacionService.updatePuntuacion(this.puntuacion).subscribe({
      next: (puntuacion: any | undefined) => {
        if (puntuacion) {
          this.puntuacion = puntuacion;
          this.messageService.add({
            severity: 'success',
            summary: 'Operación completada',
            detail: 'Puntuación actualizada'
          });

          this.dialogRef.close();
          setTimeout(() =>{
            window.location.reload()
          }, 2000);
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Operación cancelada',
            detail: 'No se ha podido actualizar la puntuación'
          });
        }
      },
      error: (error) => {
        console.error('Error al modificar una puntuacion:', error);
      }
    });
  }
}
