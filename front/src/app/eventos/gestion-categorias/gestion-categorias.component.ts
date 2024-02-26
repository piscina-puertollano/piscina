import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/categoria';
import {CategoriaService} from '../../services/categoria.service';
import { Router } from '@angular/router';
import { Alert } from '../../interfaces/alert';
import { AlertComponent } from '../../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { FormularioInsertarCategoriaComponent } from '../modals/formulario-insertar-categoria/formulario-insertar-categoria.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [FormsModule, AlertComponent,FormularioInsertarCategoriaComponent],
  templateUrl: './gestion-categorias.component.html',
  styleUrl: './gestion-categorias.component.css',
  providers:[FormularioInsertarCategoriaComponent,DialogService]
})
export class GestionCategoriasComponent implements OnInit{

  alert: Alert;
  categoria: Categoria;
  categorias: Array<Categoria> = []


  constructor(private categoriaService: CategoriaService, private router: Router,private dialogService: DialogService) {
    this.categoria = {};
    this.alert = new Alert();
  }


  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias() {

    this.categoriaService.getCategorias().subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria)
        if(categoria.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
           'No se ha podido cargar las categorias';
        }else{
          this.categorias = categoria
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCategoria(id:any) {
    this.categoriaService.getCategoria(id).subscribe({
      next: (categoria: any | undefined) => {
        this.categoria = categoria
        console.log(categoria)
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  updateCategoria() {
    this.categoriaService.updateCategoria(this.categoria).subscribe({
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

  deleteCategoria(id:any) {
    this.alert.show = false;
    this.categoriaService.deleteCategoria(id).subscribe({
      next: (categoria: any | undefined) => {
        console.log(categoria)
        if (categoria.length == 0 || categoria.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'La Categoria no se ha podido eliminar';
        } else {
          this.alert.show = true;
          this.alert.header = 'Operación completada';
          this.alert.message =
            'Categoria eliminada correctamente';
          this.alert.type = 'success'
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 2000);
  }

  abrirModal() {
    this.dialogService.open(FormularioInsertarCategoriaComponent,{
      header: 'Añadir Categoria',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
  }

}
