import { Component, OnInit } from '@angular/core';
import { NoSocio } from '../../../interfaces/noSocio';
import { Alert } from '../../../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { noSocioService } from '../../../services/noSocio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-inscribir-no-socio',
  standalone: true,
  imports: [FormsModule, AlertComponent,],
  templateUrl: './inscribir-no-socio.component.html',
  styleUrl: './inscribir-no-socio.component.css'
})
export class InscribirNoSocioComponent implements OnInit {

  alert: Alert;
  noSocio: NoSocio;
  visible: boolean
  evento: any;

  constructor(private noSocioService: noSocioService, public config: DynamicDialogConfig){
    
    this.noSocio = {};
    this.visible = false;
    this.alert = new Alert();

  }

  ngOnInit(){
    this.evento = this.config.data.evento;
  }

  insertNoSocio() {
    this.noSocioService.insertNoSocio(this.noSocio,this.evento.id).subscribe({
      next: (noSocio: any | undefined) => {
        this.noSocio = noSocio
      },
      error: (err) => {
        console.log(err);
      },
    });
    
    this.alert.show = true;
    this.alert.type = 'success'
    this.alert.header = 'Ya esta Inscrito';
    setTimeout(() => window.location.reload(),2000);
    
  }

  mostrarFormulario() {
    this.visible = true

  }

  redireccionarLogin(){

  }

}
