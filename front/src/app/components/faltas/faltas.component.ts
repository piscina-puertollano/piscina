/**
 * author: Manuel Garcia
 */
import { User } from '../../interfaces/user';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ClasehasusuarioService } from './../../services/clasehasusuario.service';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../../services/clase.service';
import { Alert } from '../../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { Clase } from '../../interfaces/clase';
import { AlertComponent } from '../../utils/alert/alert.component';
import moment from 'moment';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../services/user.service';
import { asignacionClasesUsuario } from '../../interfaces/asignacionClases';
import { Faltas } from '../../interfaces/faltas';
import { FaltasService } from './../../services/faltas.service';
import { claseUsuario } from '../../interfaces/claseUsuario';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-faltas',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    AlertComponent,
    ToastModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    RouterLink,
    InputTextareaModule,
    MultiSelectModule,
  ],
  templateUrl: './faltas.component.html',
  styleUrl: './faltas.component.css',
})
export class FaltasComponent implements OnInit {
  user: User;
  alert: Alert;
  arrUsers: Array<User> = [];
  searchValue: string = '';
  whatSearch: string = '';

  clase: Clase;
  faltas: Faltas;
  arrClaseUsuario: Array<claseUsuario> = [];
  arrClases: Array<Clase> = [];
  arrFaltas: Array<Faltas> = [];
  resultadoRelacion: asignacionClasesUsuario[] = [];
  resultadoUnion: claseUsuario[] = [];

  displayDialogCrear: boolean = false;
  selectedUser: any = null;
  selectedClase: any = null;
  clasesFiltradas: any[] = [];
  filtrado: any[] = [];
  selectedDia: string = '';
  diasSemana = [
    { label: 'Lunes', value: 'Lunes' },
    { label: 'Martes', value: 'Martes' },
    { label: 'Miércoles', value: 'Miercoles' },
    { label: 'Jueves', value: 'Jueves' },
    { label: 'Viernes', value: 'Viernes' },
  ];

  displayDialogEditar: boolean = false;
  editData: any = {
    user: null,
    dia: null,
    clase: null,
  };
  id: number = 0;

  constructor(
    private service: ClaseService,
    private UsuarioService: UserService,
    private FaltasService: FaltasService,
    private ClasehasusuarioService: ClasehasusuarioService,
    private router: Router
  ) {
    this.alert = new Alert();
    this.clase = {};
    this.faltas = {};
    this.user = {};
  }

  ngOnInit(): void {
    this.allUsers();
    this.allClases();
    this.allFaltas();
    this.allClasesUsuarios();
    this.alert = new Alert();
    this.selectedDia = '';
  }

  onDiaSeleccionado(event: any) {
    this.clasesFiltradas = this.arrClases.filter(
      (clase) => clase.nombre === event.value
    );

    for (let index = 0; index < this.clasesFiltradas.length; index++) {
      const horaInicio: moment.Moment = moment(
        this.clasesFiltradas[index].hora_inicio,
        'HH:mm:ss'
      );
      this.clasesFiltradas[index].hora_inicio = horaInicio.format('HH:mm');
    }
  }

  onUsersSeleccionados(event: any) {
    let filteredClaseUsuario = [];
    //console.log(event.value);
    for (let i = 0; i < this.resultadoUnion.length; i++) {
      if (this.resultadoUnion[i].id_clase == event.value) {
        filteredClaseUsuario.push(this.resultadoUnion[i].id_usuario);
      }
    }
    let userFiltrado: any[] = [];

    for (let k = 0; k < filteredClaseUsuario.length; k++) {
      for (let j = 0; j < this.arrUsers.length; j++) {
        if (this.arrUsers[j].id == filteredClaseUsuario[k]) {
          userFiltrado.push({
            label: this.arrUsers[j].firstName,
            value: this.arrUsers[j].id,
          });
        }
      }
    }
    this.filtrado = userFiltrado;
  }

  cerrarModalCrear() {
    this.displayDialogCrear = false;
  }

  allUsers() {
    this.UsuarioService.allUsersFaltas().subscribe({
      next: (user: any | undefined) => {
        if (user.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'No se han podido cargar a los usuarios.';
        } else {
          this.arrUsers = user;
          this.allClases();
        }
      },
      error: (err) => {
        //console.log(err);
      },
    });
  }

  allClases() {
    this.service.allClasesFaltas().subscribe({
      next: (clase: any | undefined) => {
        if (clase.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'No se han podido cargar la informacion.';
        } else {
          this.arrClases = clase;
        }
      },
      error: (err) => {
        //console.log(err);
      },
    });
  }

  allFaltas() {
    this.FaltasService.allFaltas().subscribe({
      next: (categoria: any | undefined) => {
        if (categoria.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'No se han podido cargar la informacion.';
        } else {
          this.arrFaltas = categoria;
          this.resultadoRelacion = [];

          for (let i = 0; i < this.arrFaltas.length; i++) {
            const clases = this.arrFaltas[i];
            const user = this.arrUsers.find(
              (user) => user.id === clases.id_usuario
            );
            const clase = this.arrClases.find(
              (clase) => clase.id === clases.id_clase
            );

            const relacion = {
              id: clases.id,
              id_usuario: clases.id_usuario,
              nombre_usuario: user?.firstName,
              id_clase: clases.id_clase,
              nombre_clase: clase?.nombre,
            };
            this.resultadoRelacion.push(relacion);
          }
        }
      },
      error: (err) => {
        //console.log(err);
      },
    });
  }

  allClasesUsuarios() {
    this.ClasehasusuarioService.allRelaciones().subscribe({
      next: (categorias: any | undefined) => {
        if (categorias.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message = 'No se han podido cargar la informacion.';
        } else {
          //console.log(categorias);
          this.resultadoUnion = categorias;
        }
      },
      error: (err) => {
        //console.log(err);
      },
    });
  }

  deleteRelacion(id: any) {
    this.FaltasService.deleteFaltas(id).subscribe({
      next: () => {
        this.alert.show = true;
        this.alert.message = 'Usuario eliminado';
        location.reload();
      },
      error: (err) => {
        //console.log(err);
        this.alert.show = true;
        this.alert.header = 'Error';
        this.alert.message =
          'No se ha podido eliminar el usuario. Intentalo de nuevo.';
      },
    });
  }

  abrirModalCrear() {
    this.displayDialogCrear = true;
  }

  agregarFalta() {
    let completadas = 0;
    const totalInserciones = this.selectedUser.length;

    for (let i = 0; i < this.selectedUser.length; i++) {
      const nuevaFalta = {
        id_usuario: this.selectedUser[i],
        id_clase: this.selectedClase,
        fecha: moment().toDate(),
      };

      this.FaltasService.agregarFalta(nuevaFalta).subscribe({
        next: (resultado: any) => {
          if (resultado.status >= 400) {
            this.alert.show = true;
            this.alert.header = 'Error';
            this.alert.message =
              'No se ha podido insertar la nueva falta. Póngase en contacto con un administrador.';
          } else {
            completadas++;
            if (completadas === totalInserciones) {
              location.reload();
            }
          }
        },
        error: (err) => {
         // console.log(err);
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'Ha ocurrido un error al realizar la asignación.';
        },
      });
    }
  }

  openEditModal(claseUsuario: any) {
    this.displayDialogEditar = true;
    this.editData = {
      id: claseUsuario.id,
      user: claseUsuario.id_usuario,
    };
  }

  actualizarRelacion() {
    let relacionActualizada = {
      id_usuario: this.editData.user,
      id_clase: this.editData.clase,
    };
    this.FaltasService.actualizarFaltas(
      this.editData.id,
      relacionActualizada
    ).subscribe({
      next: (resultado: any) => {
        if (resultado.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se ha podido insertar la nueva categoría. Póngase en contacto con un administrador.';
        } else {
          location.reload();
        }
      },
      error: (err) => {
        //console.log(err);
        this.alert.show = true;
        this.alert.header = 'Error';
        this.alert.message = 'Ha ocurrido un error al realizar la asignacion.';
      },
    });
  }
}
