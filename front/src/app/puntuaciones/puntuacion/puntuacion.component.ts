/**
 * @author Marina Laguna
 */
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Puntuacion } from '../../interfaces/puntuacion';
import { Alert } from '../../interfaces/alert';
import { PuntuacionService } from '../../services/puntuacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-puntuacion',
  standalone: true,
  imports: [],
  templateUrl: './puntuacion.component.html',
  styleUrl: './puntuacion.component.css',
  providers: [DialogService]
})
export class PuntuacionComponent {
  puntuacion: Puntuacion;
  alert: Alert;
  arrPuntuaciones: Array<Puntuacion> = [];
  selectPuntuaciones!: Array<Puntuacion>;
  searchValue: string = '';
  test?: Puntuacion;

  ref: DynamicDialogRef | undefined;

  constructor(private puntuacionService: PuntuacionService, private router: Router, private route: ActivatedRoute, public dialogService: DialogService){
    this.puntuacion = {};
    this.alert = new Alert();
  }
}
