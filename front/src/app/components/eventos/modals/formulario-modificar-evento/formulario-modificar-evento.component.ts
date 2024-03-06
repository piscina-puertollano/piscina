//Gonzalo M artinez Haro
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../../../../interfaces/eventos';
import { EventosService } from '../../../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Categoria } from '../../../../interfaces/categoria';
import { CategoriaService } from '../../../../services/categoria.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { FileService } from '../../../../services/file.service';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-modificar-evento',
  standalone: true,
  imports: [FormsModule,
           AlertComponent,
           ToastModule,
           ButtonModule,
           CalendarModule,
           DropdownModule,
           InputTextareaModule,
           InputSwitchModule,
           FileUploadModule],
  templateUrl: './formulario-modificar-evento.component.html',
  styleUrl: './formulario-modificar-evento.component.css'
})
export class FormularioModificarEventoComponent implements OnInit {

  evento: Evento;
  categorias: Array<Categoria> = []
  fechaLimite: Date;

  
  constructor(private messageService: MessageService,private configTranslate: PrimeNGConfig, private fileService: FileService, private eventosService: EventosService, private categoriaService: CategoriaService,public config: DynamicDialogConfig) {
    this.evento = {};

    const hoy = new Date();
    this.fechaLimite = new Date();

    this.fechaLimite.setDate(hoy.getDate() + 7);
    this.fechaLimite.setHours(23, 59, 59, 999);
  }


  ngOnInit(): void {
    this.evento = this.config.data.evento[0];

    this.getCategorias()
    
    this.configTranslate.setTranslation(
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
  
  updateEvento() {
    console.log(this.evento)
    if(this.evento.nombre == '' || this.evento.fecha == '' || this.evento.categoria == null || this.evento.sede == ''){

      this.messageService.add({
        severity: 'warn',
        summary: 'Campos vacios',
        detail: 'No puede dejar vacios los campos nombre, fecha ,sede y categoria',

      });
    }else{
    this.evento.fecha = this.formatearFecha(this.evento.fecha)    
    this.eventosService.updateEvento(this.evento).subscribe({
      next: (evento: any | undefined) => {
        console.log(evento)
        this.evento = evento

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Usuario actualizado',
        });
        
      },
      error: (err) => {
        console.log(err);
      },
    });
    //setTimeout(() => window.location.reload(), 1500);
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

  cargarPDF(event: any) {
    const file: File = event.files[0]; 
    if (file) {
      const formData = new FormData();
      formData.append('archivo', file);
  
      this.fileService.savePdf(formData, 'events').subscribe({
        next: (response) => {
          console.log('PDF cargado con éxito', response);
          
          const pdf = {
            ruta: response.ruta,
          }
        
          this.evento.pdf = pdf; 
          console.log(this.evento)
         this.evento.resultado = response.id
          
        },
        error: (error) => console.error(error)
      });
    }
  }

  borrarPdf(){

    this.evento.resultado = null;
    console.log(this.evento)
  }

}
