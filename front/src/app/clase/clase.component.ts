import { Router } from '@angular/router';
import {TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClaseService } from '../services/clase.service';
import { Alert } from '../interfaces/alert';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Clase } from '../interfaces/clase';

@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [TableModule, FormsModule],
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {
  clase: Clase;
  alert: Alert;
  arrClases: Array<Clase> = [];
  searchValue: string = ''
  whatSearch: string = ''

  constructor(private service: ClaseService, private router: Router) {
    this.clase = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.allClases();
  }

  allClases() {
    this.service.allClases().subscribe({
      next: (clase: any | undefined) => {
        console.log(clase)
        if (clase.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrClases = clase
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  edit(clase: Clase) {
    // Lógica para editar la clase
  }
  
  delete(clase: Clase) {
    // Lógica para eliminar la clase
  }
  

  /*prepareEdit(clase: any): void {
    this.currentNombre = clase.id;
    this.currentCategoria = clase.categoria;
    this.isEditing = true;
  }

  saveChanges(): void {
    // Implementa la lógica para guardar los cambios
    // Por ejemplo, puedes hacer una petición HTTP para actualizar los datos en el servidor
  }

  eliminar(clase: any): void {
    const apiUrl = `http://localhost:9090/api/clases/${clase.id}`;
    this.http.delete(apiUrl)
      .subscribe(() => {
        this.datos = this.datos.filter(item => item.id !== clase.id);
      }, error => {
        console.error('Error al eliminar la clase:', error);
      });
  }

  agregarClase(temporada: string): void {
    const apiUrl = 'http://localhost:9090/api/clases';
    const nuevaClase = { temporada };
    this.http.post(apiUrl, nuevaClase)
      .subscribe((response: any) => {
        this.datos.push(response);
      }, error => {
        console.error('Error al agregar la clase:', error);
      });
  }*/
}
