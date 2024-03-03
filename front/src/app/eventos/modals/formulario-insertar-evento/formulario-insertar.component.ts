// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../../../interfaces/eventos';
import { EventosService } from '../../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Categoria } from '../../../interfaces/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';





@Component({
  selector: 'app-formulario-insertar',
  standalone: true,
  imports: [FormsModule, AlertComponent,ToastModule,ButtonModule,CalendarModule,DropdownModule,InputTextareaModule,InputSwitchModule],
  templateUrl: './formulario-insertar.component.html',
  styleUrl: './formulario-insertar.component.css',
})
export class FormularioInsertarComponent implements OnInit {

  evento: Evento;
  categorias: Array<Categoria> = []
  
  
  

  constructor(private eventosService: EventosService, private categoriaService: CategoriaService) {
    this.evento = {};
  }

  ngOnInit(): void {
      this.getCategorias()
  }

  insertEvento() {

    this.evento.fecha = this.formatearFecha(this.evento.fecha)

    this.eventosService.insertEvento(this.evento).subscribe({
      next: (evento: any | undefined) => {
        console.log(this.evento)
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

    for(let i=0; i<this.categorias.length;i++){

    }
  }

  formatearFecha(fechaEvento: any): string {
    const fecha = new Date(fechaEvento);
    return new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(fecha);
  }

}
