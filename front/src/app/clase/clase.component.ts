/**
 * author: Manuel Garcia
 */
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { TableModule} from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../services/clase.service';
import { Alert } from '../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { Clase } from '../interfaces/clase';
import { AlertComponent } from '../utils/alert/alert.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import moment from 'moment';
@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [TableModule, FormsModule, AlertComponent, ButtonModule, InputTextModule, DialogModule, RouterLink, InputTextareaModule],
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css'],
})
export class ClaseComponent implements OnInit {
  clase: Clase;
  alert: Alert;
  arrClases: Array<Clase> = [];
  searchValue: string = '';
  whatSearch: string = '';
  selectedClase: Clase = { id: 0, id_categoria: 0, nombre: '', hora_inicio: '', hora_fin: '' };
  displayDialog: boolean = false; // Declaración de la propiedad
 
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
        console.log(clase);
        if (clase.status >=  400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrClases = clase;
          this.arrClases.forEach(claseItem => {
            const horaInicio: moment.Moment = moment(claseItem.hora_inicio, "HH:mm:ss");
            const horaFin: moment.Moment = moment(claseItem.hora_fin, "HH:mm:ss");
            claseItem.hora_inicio = horaInicio.format("HH:mm")
            claseItem.hora_fin = horaFin.format("HH:mm")
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  

  edit(clase: Clase) {
    this.clase = clase;
    this.displayDialog = true;
    console.log(clase);
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
          location.reload();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  actualizar() {
    if (this.clase && this.clase.id !== undefined) {
      this.service
        .updateClase(this.clase.id, this.clase)
        .subscribe({
          next: (clase: Clase | undefined) => {
            if (clase) {
              console.log(clase);
              location.reload()
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