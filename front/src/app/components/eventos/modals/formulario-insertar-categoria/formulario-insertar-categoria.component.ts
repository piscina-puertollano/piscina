// Gonzalo Martinez Haro
import { Component } from '@angular/core';
import { Categoria } from '../../../../interfaces/categoria';
import { CategoriaService } from '../../../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-formulario-insertar-categoria',
  standalone: true,
  imports: [FormsModule, AlertComponent,DialogModule,ToastModule,ButtonModule],
  templateUrl: './formulario-insertar-categoria.component.html',
  styleUrl: './formulario-insertar-categoria.component.css'
})
export class FormularioInsertarCategoriaComponent {

  categoria : Categoria;

  constructor(private messageService: MessageService,private categoriaService: CategoriaService) {
    this.categoria = {};
  }

  insertCategoria() {
    
    if(this.categoria.nombre == null){

      this.messageService.add({
        severity: 'warn',
        summary: 'Campos vacios',
        detail: 'No se puede dejar campos vacios',

      });
    }else{

    this.categoriaService.insertCategoria(this.categoria).subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria)
        this.categoria = categoria

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Categoria creada',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 1500);
  }
  }

}
