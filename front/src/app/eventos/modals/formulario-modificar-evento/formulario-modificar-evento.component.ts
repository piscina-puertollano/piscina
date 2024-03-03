import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../../../interfaces/eventos';
import { EventosService } from '../../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Categoria } from '../../../interfaces/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-formulario-modificar-evento',
  standalone: true,
  imports: [FormsModule, AlertComponent,ToastModule,ButtonModule,CalendarModule,DropdownModule,InputTextareaModule,InputSwitchModule],
  templateUrl: './formulario-modificar-evento.component.html',
  styleUrl: './formulario-modificar-evento.component.css'
})
export class FormularioModificarEventoComponent implements OnInit {

  evento: Evento;
  categorias: Array<Categoria> = []
  constructor(private eventosService: EventosService, private categoriaService: CategoriaService,public config: DynamicDialogConfig,) {
    this.evento = {};
  }


  ngOnInit(): void {
    this.evento = this.config.data.evento[0];

    this.getCategorias()
    console.log(this.evento)
    console.log(this.categorias)
  }
  
  updateEvento() {
    
    this.evento.fecha = this.formatearFecha(this.evento.fecha)    
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

  getCategorias() {

    this.categoriaService.getCategorias().subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria)
       
          this.categorias = categoria
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  formatearFecha(fechaEvento: any): string {
    
    let fecha = new Date(fechaEvento);
    
   
    if (isNaN(fecha.getTime()) && typeof fechaEvento === 'string') {
      const partes = fechaEvento.split('/');
      if (partes.length === 3) {
        fecha = new Date(`${partes[1]}/${partes[0]}/${partes[2]}`);
      }
    }
    
   
    if (!isNaN(fecha.getTime())) {
      return new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(fecha);
    } else {
   
      console.error('Valor de fecha inválido:', fechaEvento);
      return '';
    }
  }

}
