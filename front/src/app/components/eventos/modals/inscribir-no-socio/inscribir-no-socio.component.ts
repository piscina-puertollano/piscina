// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { NoSocio } from '../../../../interfaces/noSocio';
import { Alert } from '../../../../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { noSocioService } from '../../../../services/noSocio.service';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-inscribir-no-socio',
  standalone: true,
  imports: [FormsModule, AlertComponent,ToastModule,ButtonModule],
  templateUrl: './inscribir-no-socio.component.html',
  styleUrl: './inscribir-no-socio.component.css'
})
export class InscribirNoSocioComponent implements OnInit {

  alert: Alert;
  noSocio: NoSocio;
  visible: boolean
  evento: any;

  constructor(private messageService: MessageService,private router: Router,private noSocioService: noSocioService, public config: DynamicDialogConfig, private ref: DynamicDialogRef){
    
    this.noSocio = {};
    this.visible = false;
    this.alert = new Alert();

  }

  ngOnInit(){
    
    this.evento = this.config.data.evento;
  }

  redireccionarLogin() {

    this.ref.close();
    this.router.navigate(['/login']);
  }

  insertNoSocio() {

    if(this.noSocio.nombre == null || this.noSocio.apellidos == null || this.noSocio.email == null){

      this.messageService.add({
        severity: 'warn',
        summary: 'Campos vacios',
        detail: 'No puede dejar campos vacios',

      });

    }else{

    this.noSocioService.insertNoSocio(this.noSocio,this.evento.id).subscribe({
      next: (noSocio: any | undefined) => {
        this.noSocio = noSocio

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Ya esta inscrito',
        });
      },
      error: (err) => {
        //console.log(err);
      },
    });
    
  
    //setTimeout(() => window.location.reload(),2000);
  }
    
  }

  mostrarFormulario() {
    this.visible = true

  }

  
}
