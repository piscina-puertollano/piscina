// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  ConfirmationService,
  FilterService,
  MessageService,
} from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { firstValueFrom } from 'rxjs';
<<<<<<< HEAD:front/src/app/eventos/gestion-eventos/gestion-eventos.component.ts
import { Files } from '../../interfaces/upload';
import { FileService } from '../../services/file.service';
import { environment } from '../../../environments/environment.development';
=======
import { Files } from '../../../interfaces/upload';
import { FileService } from '../../../services/file.service';
import { environment } from '../../../../environments/environment.development';
>>>>>>> f0f820888a5fbfe28ae960c6b40ad6001465a6ca:front/src/app/components/eventos/gestion-eventos/gestion-eventos.component.ts
import { FormularioInsertarComponent } from '../modals/formulario-insertar-evento/formulario-insertar.component';
import { FormularioModificarEventoComponent } from '../modals/formulario-modificar-evento/formulario-modificar-evento.component';
import { Evento } from '../../../interfaces/eventos';
import { EventosService } from '../../../services/evento.service';

import { Alert } from '../../../interfaces/alert';




@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [
    InputTextModule,
    TableModule,
    DatePipe,
    CurrencyPipe,
    ProgressBarModule,
    FormsModule,
    TooltipModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    ConfirmDialogModule,
    DialogModule,
    DialogComponent,
    FormularioInsertarComponent
    
  ],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css',
  providers:[FormularioInsertarComponent,DialogService]
})
export class GestionEventosComponent implements OnInit{

  alert: Alert;
  evento: Evento;
  eventos: Array<Evento> = []
  selectEventos!: Array<Evento>;
  searchValue: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(private eventosService: EventosService,private dialogService: DialogService) {
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
        this.evento = evento;
        console.log(evento);
        this.evento = evento;

        this.ref = this.dialogService.open(FormularioModificarEventoComponent, { 
          header: 'Editar evento',
          modal: true,
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
          },
          data:{
            evento:evento
          }
      });
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


  abrirModalInsert() {
    this.dialogService.open(FormularioInsertarComponent,{
      header: 'Añadir Evento',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      }
    });
  }

  
  
}
