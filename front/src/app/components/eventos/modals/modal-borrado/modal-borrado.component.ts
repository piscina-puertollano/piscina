//Gonzalo M artinez Haro
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { EventosService } from '../../../../services/evento.service';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '../../../../services/categoria.service';
import { noSocioService } from '../../../../services/noSocio.service';


@Component({
  selector: 'app-modal-borrado',
  standalone: true,
  imports: [FormsModule, AlertComponent,ToastModule,ButtonModule],
  templateUrl: './modal-borrado.component.html',
  styleUrl: './modal-borrado.component.css'
})
export class ModalBorradoComponent implements OnInit{

  id : number
  tipo : string

  constructor(private noSocioService: noSocioService,private categoriaService: CategoriaService ,private config: DynamicDialogConfig, private router: Router ,private eventosService: EventosService,private dialogService: DialogService,private messageService: MessageService, private ref: DynamicDialogRef) {
    this.id = 0
    this.tipo = ''
  }



  ngOnInit(): void {
    this.id = this.config.data.id;
    this.tipo = this.config.data.tipo;
  }


  cerrarModal() {
    this.ref.close();
  }


  delete(){

    if(this.tipo == 'evento'){

      this.deleteEvento()

    }else if(this.tipo == 'categoria'){

      this.deleteCategoria()

    }else if(this.tipo == 'noSocio'){

      this.deleteNoSocio()

    }

   
    setTimeout(() => window.location.reload(), 2000);
  }

  deleteEvento() {

    this.eventosService.deleteEvento(this.id).subscribe({
      next: (evento: any | undefined) => {
        console.log(evento)

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Evento eliminado',
        });
       
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 2000);
  }

  
  deleteCategoria() {
   
    this.categoriaService.deleteCategoria(this.id).subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria)
        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Categoria eliminada',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 2000);
  }


  deleteNoSocio() {
   
    this.noSocioService.deleteNoSocio(this.id).subscribe({
      next: (noSocio: any | undefined) => {
        console.log(noSocio)
       
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 2000);
  }

}
