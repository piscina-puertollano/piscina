// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/eventos';
import { Alert } from '../../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../utils/alert/alert.component';
import { EventosService } from '../../services/evento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { InscribirNoSocioComponent } from '../modals/inscribir-no-socio/inscribir-no-socio.component';
import { EventoUsuarioService } from '../../services/eventoUsuario.service';
import { EventoUsuario } from '../../interfaces/eventoUsuario';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [FormsModule, AlertComponent,PdfViewerModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
  providers:[DialogService, InscribirNoSocioComponent]
})


export class EventoComponent implements OnInit{

  alert : Alert
  evento : Evento
  eventoUsuario : EventoUsuario


  constructor(private eventosService: EventosService, private router: Router,private dialogService: DialogService, private route: ActivatedRoute, private eventoUsuarioService: EventoUsuarioService) {
    this.evento = {};
    this.alert = new Alert();
    this.eventoUsuario = {};

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getEvento(id);
      }
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


  inscribirSocio() {

    this.eventoUsuario.idEvento = this.evento.id
    //this.eventoUsuario.idUsuario =
    
    this.eventoUsuarioService.insertNoSocio(this.eventoUsuario).subscribe({
      next: (eventoUsuario: any | undefined) => {
        this.eventoUsuario = eventoUsuario

        this.alert.show = true;
        this.alert.type = 'succes'
        this.alert.header = 'Ya esta Inscrito';
        setTimeout(() => this.alert.show = false, 2500);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  comprobarPrivado() {  

    //realizar esta comprobación al cargar la pagina despues de comprobar si es socio, ó al pulsar el boton despues de verificar el tokken

    if(this.evento.privado == true){

      this.alert.show = true;
      this.alert.header = 'Evento privado';
      this.alert.message =
      'Este evento es unicamente para socios';
      setTimeout(() => this.alert.show = false, 2500);

      // ó desavilitar el boton en caso de comprobar al cargar la pagina

    }else{

      this.abrirInscribirNoSocio();
    }
  }

  abrirInscribirNoSocio() {
    this.dialogService.open(InscribirNoSocioComponent,{
      data: {
        evento: this.evento
      },
      header: 'Inscripción Evento',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
  }




}
