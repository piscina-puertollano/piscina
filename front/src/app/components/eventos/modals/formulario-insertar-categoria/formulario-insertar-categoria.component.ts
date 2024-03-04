// Gonzalo Martinez Haro
import { Component } from '@angular/core';
import { Categoria } from '../../../../interfaces/categoria';
import { CategoriaService } from '../../../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button'; 

@Component({
  selector: 'app-formulario-insertar-categoria',
  standalone: true,
  imports: [FormsModule, AlertComponent,DialogModule,ToastModule,ButtonModule],
  templateUrl: './formulario-insertar-categoria.component.html',
  styleUrl: './formulario-insertar-categoria.component.css'
})
export class FormularioInsertarCategoriaComponent {

  categoria : Categoria;

  constructor(private categoriaService: CategoriaService) {
    this.categoria = {};
  }

  insertCategoria() {
    this.categoriaService.insertCategoria(this.categoria).subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria)
        this.categoria = categoria
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.location.reload();
  }

}
