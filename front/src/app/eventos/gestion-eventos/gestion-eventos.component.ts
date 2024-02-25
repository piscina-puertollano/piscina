import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/eventos';
import { EventosService } from '../../services/evento.service';
import { Router } from '@angular/router';
import { Alert } from '../../interfaces/alert';
import { AlertComponent } from '../../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { FormularioInsertarComponent } from '../modals/formulario-insertar/formulario-insertar.component';
import { DialogService } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [FormsModule, AlertComponent,FormularioInsertarComponent],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css',
  providers:[FormularioInsertarComponent,DialogService]
})
export class GestionEventosComponent implements OnInit{

  alert: Alert;
  evento: Evento;
  eventos: Array<Evento> = []
  

  constructor(private eventosService: EventosService, private router: Router,private dialogService: DialogService) {
    this.evento = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.getEventos()
  }


  getEventos() {
    //console.log('asdf')
    this.eventosService.getEventos().subscribe({
      next: (evento: any | undefined) => {
        //console.log(evento)
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

  getEvento(id:any) {
    this.eventosService.getEvento(id).subscribe({
      next: (evento: any | undefined) => {
        this.evento = evento
        console.log(evento)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  insertEvento() {
    this.eventosService.insertEvento(this.evento).subscribe({
      next: (evento: any | undefined) => {
        console.log(evento)
        this.evento = evento
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.location.reload();
  }

  updateEvento() {
    this.eventosService.updateEvento(this.evento).subscribe({
      next: (evento: any | undefined) => {
        console.log(evento)
        this.evento = evento
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.location.reload();
  }

  deleteEvento(id:any) {
    this.alert.show = false;
    this.eventosService.deleteEvento(id).subscribe({
      next: (evento: any | undefined) => {
        console.log(evento)
        if (evento.length == 0 || evento.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'El evento no se ha podido eliminar';
        } else {
          this.alert.show = true;
          this.alert.header = 'Operación completada';
          this.alert.message =
            'Evento eliminado correctamente';
          this.alert.type = 'success'
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 2000);
  }


  abrirModal() {
    this.dialogService.open(FormularioInsertarComponent,{
      header: 'Añadir Evento',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
  }


}
