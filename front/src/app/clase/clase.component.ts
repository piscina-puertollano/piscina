import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../services/clase.service';
import { Alert } from '../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { Clase } from '../interfaces/clase';
import { AlertComponent } from '../utils/alert/alert.component';

@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [TableModule, FormsModule, AlertComponent],
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css'],
})
export class ClaseComponent implements OnInit {
  clase: Clase = new Clase();
  alert: Alert;
  arrClases: Array<Clase> = [];
  searchValue: string = '';
  whatSearch: string = '';
  selectedClase: Clase = { id: 0, categoria: '' };
  nuevaClase: Clase = { categoria: ''};

  constructor(private service: ClaseService, private router: Router) {
    this.clase = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.allClases();
  }

  agregarClase() {
    this.nuevaClase.categoria = this.clase.categoria
    console.log(this.nuevaClase)
    this.service.agregarClase(this.nuevaClase).subscribe({
      next: (nuevaClase: Clase) => {
        console.log('Clase agregada exitosamente:', nuevaClase);
      },
      error: (err) => {
        console.error('Error al agregar la clase:', err);
      }
    });
  }
  
  allClases() {
    this.service.allClases().subscribe({
      next: (clase: any | undefined) => {
        console.log(clase);
        if (clase.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrClases = clase;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  edit(clase: Clase) {
    this.selectedClase = clase;
  }

  deleteClase(id: any) {
    this.alert.show = false;
    this.service.deleteclase(id).subscribe({
      next: (clase: any | undefined) => {
        console.log(clase);
        if (clase.length == 0 || clase.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'El usuario no se ha podido eliminar';
        } else {
          this.alert.show = true;
          this.alert.header = 'Operación completada';
          this.alert.message = 'Usuario eliminado correctamente';
          //this.alert.type = 'success'
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  actualizar() {
    if (this.selectedClase && this.selectedClase.id !== undefined) {
      this.service
        .updateClase(this.selectedClase.id, this.selectedClase)
        .subscribe({
          next: (clase: Clase | undefined) => {
            if (clase) {
              console.log(clase);
              this.selectedClase = clase;
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.error('Clase o ID de la clase no definidos');
    }
  }
}
