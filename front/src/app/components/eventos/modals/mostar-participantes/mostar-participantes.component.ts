//Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EventosService } from '../../../../services/evento.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from '../../../../services/user.service';
import { EventoUsuarioService } from '../../../../services/eventoUsuario.service';
import { Participante } from '../../../../interfaces/participante';
import { noSocioService } from '../../../../services/noSocio.service';



@Component({
  selector: 'app-mostar-participantes',
  standalone: true,
  imports: [ InputTextModule,
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
              DialogModule],
  templateUrl: './mostar-participantes.component.html',
  styleUrl: './mostar-participantes.component.css'
})
export class MostarParticipantesComponent implements OnInit {

  listaUsuarios: any

  listaNoSocios: any

  selectParticipantes!: Array<Participante>;

  participante: Participante
  participantes: Array<Participante> = []

  idEvento: number

  searchValue: string = '';


  constructor(private noSocioService: noSocioService, private eventoService: EventosService, private userService: UserService, private eventoUsuarioService: EventoUsuarioService,public config: DynamicDialogConfig){

 
    this.idEvento = 0
    this.participante = {}
    this.listaUsuarios = {}
    this.listaNoSocios = {}
    
    
  }


  ngOnInit(): void {
    this.idEvento = this.config.data.id;
    this.getUsuarios(this.idEvento)
    this.getNoSocios(this.idEvento)

  }


  getUsuarios(id : number){

    this.eventoUsuarioService.getUsuariosConIdEvento(id).subscribe({
      next: (usuarios: any | undefined) => {
        this.listaUsuarios = usuarios

        for(let i=0; i< this.listaUsuarios.length;i++){

          //console.log('entra')
          
            this.participante.nombre = this.listaUsuarios[i].firstName
            this.participante.apellidos = this.listaUsuarios[i].lastName
            this.participante.email = this.listaUsuarios[i].email
            this.participante.tipo = 'Socio'
    
            this.participantes.push(this.participante)
            this.participante = {}
            //console.log(this.participante)

        }
        //console.log(this.participantes)
      }
      
    })
    
  }

  getNoSocios(id : number){

    this.noSocioService.getNoSociosConIdEvento(id).subscribe({
      next: (noSocios: any | undefined) => {
        this.listaNoSocios = noSocios
        //console.log(this.listaNoSocios)
        
        for(let i=0; i< this.listaNoSocios.length;i++){

          //console.log('entra')
          
            this.participante.nombre = this.listaNoSocios[i].nombre
            this.participante.apellidos = this.listaNoSocios[i].apellidos
            this.participante.email = this.listaNoSocios[i].email
            this.participante.tipo = 'No Socio'
    
            this.participantes.push(this.participante)
            this.participante = {}
            //console.log(this.participante)

        }
        //console.log(this.participantes)
      }
      
    })

  }




}
