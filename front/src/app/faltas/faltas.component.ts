/**
 * author: Manuel Garcia
 */
import { ClaseService } from './../services/clase.service';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../utils/alert/alert.component';
import { InputTextModule } from 'primeng/inputtext';
import { Alert } from '../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Faltas } from '../interfaces/faltas';
import { User } from '../interfaces/user';
import { Clase } from '../interfaces/clase';
import { FaltasService } from '../services/faltas.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { UsuarioClaseFaltas } from '../interfaces/usuarioClaseFaltas';
import moment from 'moment';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-faltas',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    AlertComponent,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RouterLink,
    DialogModule,
    MultiSelectModule
  ],
  templateUrl: './faltas.component.html',
  styleUrl: './faltas.component.css',
})
export class FaltasComponent implements OnInit {
  faltas: Faltas;
  user: User;
  clase: Clase;
  alert: Alert;
  relaciones: UsuarioClaseFaltas;
  resultadoRelacion: Array<UsuarioClaseFaltas> = [];

  searchValue: string = '';
  displayModal: boolean = false;
  falta = {
    id: '',
    id_clase: null,
  };

  arrFaltas: Array<Faltas> = [];
  arrUsers: Array<User> = [];
  arrClase: Array<Clase> = [];

  displayAddModal: boolean = false;
  newFaltas = {
    nombre_dia: '',
    nombre_clase: '',
    fecha: '',
  };

  listaClases:any

  diasSemana = [
    { label: 'Lunes', value: 'Lunes' },
    { label: 'Martes', value: 'Martes' },
    { label: 'Miércoles', value: 'Miercoles' },
    { label: 'Jueves', value: 'Jueves' },
    { label: 'Viernes', value: 'Viernes' },
  ];

  constructor(
    private service: FaltasService,
    private UserService: UserService,
    private ClaseService: ClaseService,
    private router: Router
  ) {
    this.user = {};
    this.clase = {};
    this.faltas = {};
    this.relaciones = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.allClases();
    this.allUsers();
  }

  openAddModal() {
    this.displayAddModal = true;
  }
  closeAddModal() {
    this.displayAddModal = false;
  }
  addNewFalta() {
    console.log(this.newFaltas);
    this.closeAddModal();
  }

  updateData() {
    console.log('Datos actualizados:', this.faltas);
    this.displayModal = false;
  }

  allFaltas() {
    this.service.allFaltas().subscribe({
      next: (faltas: any | undefined) => {
        if (faltas.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrFaltas = faltas;
          console.log(faltas)
          console.log('faltas: ', this.arrFaltas)
          
          for (let i = 0; i < this.arrFaltas.length; i++) {
            const falta = this.arrFaltas[i];
            const user = this.arrUsers.find(
              (user) => user.id === falta.id_usuario
            );
            const clase = this.arrClase.find(
              (clase) => clase.id === falta.id_clase
            );

            const fecha = moment(falta.fecha)
            

            const relacion = {
              id: falta.id,
              id_usuario: user?.id,
              nombre_usuario: user?.firstName,
              id_clase: clase?.id,
              nombre_clase: clase?.nombre,
              fecha: fecha.format('DD/MM/YYYY'),
            };
            this.resultadoRelacion[i] = relacion;
          }
          console.log(this.resultadoRelacion);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  allUsers() {
    this.UserService.allUsersFaltas().subscribe({
      next: (user: any | undefined) => {
        if (user.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar a los usuarios. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrUsers = user;
          this.allFaltas();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  allClases() {
    this.ClaseService.allClases().subscribe({
       next: (clase: any | undefined) => {
         if (clase.status >= 400) {
           this.alert.show = true;
           this.alert.header = 'Error';
           this.alert.message = 'No se han podido cargar a los usuarios. Póngase en contacto con un adminsitrador.';
         } else {
           this.arrClase = clase;
           this.listaClases = [];
           for (let i = 0; i < this.arrClase.length; i++) {
            const horaInicio: moment.Moment = moment(this.arrClase[i].hora_inicio, "HH:mm:ss");
            let claseSeleccionada = {
               label: horaInicio.format("HH:mm"),
               value: this.arrClase[i].id
             };
             // Agregar el nuevo objeto a listaClases usando push()
             this.listaClases.push(claseSeleccionada);
           }
         }
       },
       error: (err) => {
         console.log(err);
       },
    });
   }
   
   

  edit(faltas: Faltas) {
    this.faltas = faltas;
    this.displayModal = true;
    console.log(faltas);
  }

  deleteFaltas(id: any) {
    this.alert.show = false;
    this.service.deleteFaltas(id).subscribe({
      next: (faltas: any | undefined) => {
        console.log(faltas);
        if (faltas.length == 0 || faltas.status == 404) {
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
}
