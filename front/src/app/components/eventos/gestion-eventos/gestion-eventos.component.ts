// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
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
import { FormularioInsertarComponent } from '../modals/formulario-insertar-evento/formulario-insertar.component';
import { FormularioModificarEventoComponent } from '../modals/formulario-modificar-evento/formulario-modificar-evento.component';
import { Evento } from '../../../interfaces/eventos';
import { EventosService } from '../../../services/evento.service';
import { Alert } from '../../../interfaces/alert';
import { MostarParticipantesComponent } from '../modals/mostar-participantes/mostar-participantes.component';
import { Router } from '@angular/router';
import { ModalBorradoComponent } from '../modals/modal-borrado/modal-borrado.component';




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

  constructor(private router: Router ,private eventosService: EventosService,private dialogService: DialogService,private messageService: MessageService) {
    this.evento = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.getEventos()
  }

  gestionCategorias() {
    this.router.navigate(['/event-category']);
  }

  gestionNoSocios() {
    this.router.navigate(['/non-member-management']);
  }

  getEventos() {
   
    this.eventosService.getEventos().subscribe({
      next: (evento: any | undefined) => {
          this.eventos = evento
        
      },
      error: (err) => {
        //console.log(err);
      },
    });
  }

  getEvento(id:any) {
    this.eventosService.getEvento(id).subscribe({
      next: (evento: any | undefined) => {
        this.evento = evento;
        //console.log(evento);
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
        //console.log(err);
      },
    });
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

  abrirModalBorrado(id : any) {
    this.dialogService.open(ModalBorradoComponent,{
     
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data:{
        id : id,
        tipo: 'evento'
      }
    });
  }

  abrirModalParticipantes(id : number) {

    this.dialogService.open(MostarParticipantesComponent,{
      header: 'Participantes',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data:{
        id: id
      }
    })
  }

  
  
}
