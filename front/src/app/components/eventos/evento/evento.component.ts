// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../interfaces/eventos';
import { Alert } from '../../../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { EventosService } from '../../../services/evento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { InscribirNoSocioComponent } from '../modals/inscribir-no-socio/inscribir-no-socio.component';
import { EventoUsuarioService } from '../../../services/eventoUsuario.service';
import { EventoUsuario } from '../../../interfaces/eventoUsuario';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { environment } from '../../../../environments/environment.development';
import { Files } from '../../../interfaces/upload';
import { FileService } from '../../../services/file.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [FormsModule, AlertComponent,PdfViewerModule,NgxExtendedPdfViewerModule,ToastModule,ButtonModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
  providers:[DialogService, InscribirNoSocioComponent],
  
})


export class EventoComponent implements OnInit{

  alert : Alert
  evento : Evento
  eventoUsuario : EventoUsuario
  resultado : any = {}


  constructor(private messageService: MessageService,private fileService: FileService, private pdfService: NgxExtendedPdfViewerService,private eventosService: EventosService, private router: Router,private dialogService: DialogService, private route: ActivatedRoute, private eventoUsuarioService: EventoUsuarioService) {
    this.evento = {};
    this.alert = new Alert();
    this.eventoUsuario = {};

    pdfDefaultOptions.doubleTapZoomFactor = '150%'; 
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; 
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    

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
        this.evento = evento[0]
        //console.log(this.evento)

        let pdf: Files = {
          id: this.evento.pdf?.ruta,
          where: environment.events_path
        }
        //console.log(pdf)
        this.fileService.showImage(pdf).subscribe({
          next: (pdf: any | undefined) => {
    
            this.resultado = ({id:this.evento.pdf?.ruta, pdf: URL.createObjectURL(pdf)})
       
          },
        });

      },
      error: (err) => {
        //console.log(err);
      },
    });
    
    

    
  }


  inscribirSocio() {

    
    const localStorage = document.defaultView?.localStorage
    const userJson = localStorage?.getItem('user')
      if(userJson){
        const user = JSON.parse(userJson)

        this.eventoUsuario.idEvento = this.evento.id
        this.eventoUsuario.idUsuario = user.user.id
    
        this.eventoUsuarioService.insertEventoUsuario(this.eventoUsuario).subscribe({
        next: (eventoUsuario: any | undefined) => {
          this.eventoUsuario = eventoUsuario

          this.messageService.add({
            severity: 'success',
            summary: 'Operación completada',
            detail: 'Ya esta registrado',
          });
          },
          error: (err) => {
            //console.log(err);
          },
        })
      }

    
  }

  comprobarPrivado() {  

    if(this.evento.privado == true){

      this.messageService.add({
        severity: 'error',
        summary: 'Inscripcion Denegada',
        detail: 'Evento solo para socios',
      });

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

  showPdf() {
    
      let pdf: Files = {
        id: this.evento.pdf?.ruta,
        where: environment.events_path
      }
      //console.log(pdf)
      this.fileService.showImage(pdf).subscribe({
        next: (pdf: any | undefined) => {

          this.resultado = ({id:this.evento.pdf?.ruta, pdf: URL.createObjectURL(pdf)})
     
          
        },
      });
    }

    comprobarSocio(){
      
      const localStorage = document.defaultView?.localStorage;
      //console.log(localStorage)
      if (localStorage) {
        const userJson = localStorage.getItem('user');
        if(userJson != null){
          const user = JSON.parse(userJson);
  
        if (user.token) {
          
          this.comprobarEdad()
        } else {
          this.comprobarPrivado()
        }
  
        }else{
          this.comprobarPrivado()
        }
        
      } else {
        //console.log('El localStorage no está disponible en el servidor.');
      }
    }

    comprobarEdad(){

      const localStorage = document.defaultView?.localStorage;
      const userJson = localStorage?.getItem('user');

        if(userJson != null){
          const user = JSON.parse(userJson);
       
          const fechaNacimiento  = user.user.born_date;
          const añoNacimiento = fechaNacimiento .substring(0, 4);

          const fechaActual = new Date();
          const añoActual = new Date().getFullYear();

          const resultado = añoActual - añoNacimiento
          
          if(resultado <18){

            this.messageService.add({
              severity: 'error',
              summary: 'Inscripcion Denegada',
              detail: 'Solo pueden inscribirse mayores de edad',
            });
          }else{
            this.inscribirSocio()

          }
        }else{
          //console.log('user null')
        }
    }
    
  }




