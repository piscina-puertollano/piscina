// Gonzalo Martinez Haro
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button'; // Ejemplo de importación de un componente
import { Evento } from '../../../interfaces/eventos';
import { EventosService } from '../../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { DialogModule } from 'primeng/dialog';




@Component({
  selector: 'app-formulario-insertar',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './formulario-insertar.component.html',
  styleUrl: './formulario-insertar.component.css'
})
export class FormularioInsertarComponent {

  evento: Evento;
  

  constructor(private eventosService: EventosService) {
    this.evento = {};
  }

  

  insertEvento() {
    this.eventosService.insertEvento(this.evento).subscribe({
      next: (evento: any | undefined) => {
        //console.log(evento)
        this.evento = evento
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.location.reload();
  }

}
