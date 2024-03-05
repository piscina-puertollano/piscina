import { Component, Input, OnInit } from '@angular/core';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Alert } from '../../../interfaces/alert';
import { Puntuacion } from '../../../interfaces/puntuacion';
import { PuntuacionService } from '../../../services/puntuacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

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

  constructor(private puntuacionService: PuntuacionService, private router: Router, private route: ActivatedRoute, public config: DynamicDialogConfig){
    this.alert = new Alert();

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
          this.alert.message = 'Puntuación actualizada con éxito.';
        } else {
          this.alert.message = 'No se pudo actualizar la puntuación.';
        }
      },
      error: (error) => {
        this.alert.message = 'Error al actualizar la puntuación: ' + error.message;
      }
    });
  }
}
