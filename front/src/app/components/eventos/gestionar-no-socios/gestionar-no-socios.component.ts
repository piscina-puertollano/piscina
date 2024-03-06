// Gonzalo Martinez Haro
import { Component,OnInit } from '@angular/core';
import { NoSocio } from '../../../interfaces/noSocio';
import { noSocioService } from '../../../services/noSocio.service';
import { Alert } from '../../../interfaces/alert';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';



@Component({
  selector: 'app-gestionar-no-socios',
  standalone: true,
  imports: [FormsModule,
     AlertComponent,
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
    ],
  templateUrl: './gestionar-no-socios.component.html',
  styleUrl: './gestionar-no-socios.component.css'
})
export class GestionarNoSociosComponent implements OnInit{

  alert: Alert;
  noSocio: NoSocio;
  noSocios: Array<NoSocio> = [];
  selectNoSocios!: Array<NoSocio>;
  searchValue: string = '';

  constructor(private messageService: MessageService,private router: Router, private noSocioService: noSocioService) {
    this.alert = new Alert();
    this.noSocio = {};
  }

  ngOnInit(): void {
    this.getNoSocios(); 
    
  }

  gestionEventos() {
    this.router.navigate(['/event-management']);
  }

  gestionCategorias() {
    this.router.navigate(['/event-category']);
  }

  getNoSocios() {

    
    this.noSocioService.getNoSocios().subscribe({
      next: (noSocio: any | undefined) => {
        
        
          this.noSocios = noSocio
          console.log(this.noSocios)
        
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  getNoSocio(id:any) {

    this.noSocioService.getNoSocio(id).subscribe({
      next: (noSocio: any | undefined) => {
        this.noSocio = noSocio
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateNoSocio() {
    this.noSocioService.updateNoSocio(this.noSocio).subscribe({

      next:( noSocio: any |undefined) => {
        this.noSocio = noSocio
      },
      error: (err) => {
        console.log(err);
      }
    })
    window.location.reload();
  }

  deleteNoSocio(id:any) {
    this.alert.show = false;
    this.noSocioService.deleteNoSocio(id).subscribe({
      next: (noSocio: any | undefined) => {
        console.log(noSocio)

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Evento actualizado',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 2000);
  }


  /*abrirModalBorrado(id : any) {
    this.dialogService.open(ModalBorradoComponent,{
     
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data:{
        id : id,
        tipo: 'categoria'
      }
    });
  }*/


}
