// Gonzalo Martinez Haro
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../../../../interfaces/eventos';
import { EventosService } from '../../../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Categoria } from '../../../../interfaces/categoria';
import { CategoriaService } from '../../../../services/categoria.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';






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
  
  fechaLimite: Date;

  

  constructor(private eventosService: EventosService, private categoriaService: CategoriaService,private config: PrimeNGConfig,private messageService: MessageService) {
    this.evento = {};

    const hoy = new Date();
    this.fechaLimite = new Date();

    this.fechaLimite.setDate(hoy.getDate() + 7);
    this.fechaLimite.setHours(23, 59, 59, 999); 
  

  }

  ngOnInit(): void {
      this.getCategorias()
      this.config.setTranslation(
        {
          firstDayOfWeek: 1, 
          dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
          dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
          dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
          monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
          monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
          today: 'Hoy',
          clear: 'Borrar'
        }
      )
      
      
  }

  insertEvento() {

    

    if(this.evento.nombre == null || this.evento.fecha == null || this.evento.categoria == null || this.evento.sede == null){

      this.messageService.add({
        severity: 'warn',
        summary: 'Campos vacios',
        detail: 'No puede dejar vacios los campos nombre, fecha ,sede y categoria',

      });
    }else{
    this.evento.fecha = this.formatearFecha(this.evento.fecha)
    this.eventosService.insertEvento(this.evento).subscribe({
      next: (evento: any | undefined) => {
        
        this.evento = evento
        console.log(this.evento)

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Evento creado',
        });
        
      },
      error: (err) => {
        console.log(err);
      },
    });
    
    setTimeout(() => window.location.reload(), 1500);
  }
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
