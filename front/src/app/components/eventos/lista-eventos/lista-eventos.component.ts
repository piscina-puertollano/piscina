// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../interfaces/eventos';
import { EventosService } from '../../../services/evento.service';
import { Router } from '@angular/router';
import { Alert } from '../../../interfaces/alert';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [FormsModule, AlertComponent, CardModule,ButtonModule],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit{

  alert: Alert;
  evento: Evento;
  eventos: Array<Evento> = []

  constructor(private eventosService: EventosService, private router: Router) {
    this.evento = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.getEventos()
  }

  descEvento(eventoId: any) {
    this.router.navigate(['/descEvento', eventoId]);
  }

  getEventos() {
    this.eventosService.getEventos().subscribe({
      next: (evento: any | undefined) => {
        console.log(evento)
        if (evento.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar a los eventos.';
        } else {
          this.eventos = evento
          console.log(evento.categoria)
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getEventosVisibles() {
    this.eventosService.getEventosVisibles().subscribe({
      next: (evento: any | undefined) => {
        console.log(evento)
        if (evento.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar a los eventos.';
        } else {
          this.eventos = evento
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
}
