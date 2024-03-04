/**
 * author: Manuel Garcia
 */

import { ClasehasusuarioService } from '../../services/clasehasusuario.service';
import { claseUsuario } from '../../interfaces/claseUsuario';
import { User } from '../../interfaces/user';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
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
import { CategoriaClasesService } from '../../services/categoria-clases.service';
import { CategoriaClases } from '../../interfaces/categoriaClases';
import { UserService } from '../../services/user.service';
import { asignacionClasesUsuario } from '../../interfaces/asignacionClases';
@Component({
  selector: 'app-asignar-clases-usuarios',
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
  ],
  templateUrl: './asignar-clases-usuarios.component.html',
  styleUrl: './asignar-clases-usuarios.component.css',
})
export class AsignarClasesUsuariosComponent implements OnInit {
  user: User;
  alert: Alert;
  arrUsers: Array<User> = [];
  searchValue: string = '';
  whatSearch: string = '';

  clase: Clase;
  claseUsuario: claseUsuario;
  arrClaseUsuario: Array<claseUsuario> = [];
  arrClases: Array<Clase> = [];

  resultadoRelacion: asignacionClasesUsuario[] = [];

  displayDialogCrear: boolean = false;

  constructor(
    private service: ClaseService,
    private UsuarioService: UserService,
    private ClasehasusuarioService: ClasehasusuarioService,
    private router: Router
  ) {
    this.alert = new Alert();
    this.clase = {};
    this.claseUsuario = {};
    this.user = {};
  }

  ngOnInit(): void {
    this.allUsers();
    this.allClases();
    this.alert = new Alert();
  }



  cerrarModalCrear() {
    this.displayDialogCrear = false;
   }

  allUsers() {
    this.UsuarioService.allUsers().subscribe({
      next: (user: any | undefined) => {
        if (user.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar a los usuarios.';
        } else {
          this.arrUsers = user;
          this.allClases();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  allClases() {
    this.service.allClases().subscribe({
      next: (clase: any | undefined) => {
        if (clase.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion.';
        } else {
          this.arrClases = clase;
          this.allClasesUsuarios();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  allClasesUsuarios() {
    this.ClasehasusuarioService.allRelacion().subscribe({
      next: (categoria: any | undefined) => {
        if (categoria.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion.';
        } else {
          this.arrClaseUsuario = categoria;
          this.resultadoRelacion = []; // Inicializamos el array resultadoRelacion

          for (let i = 0; i < this.arrClaseUsuario.length; i++) {
            const clases = this.arrClaseUsuario[i];
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
          console.log(this.resultadoRelacion);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteRelacion(id: any) {
    this.ClasehasusuarioService.deleteRelacion(id).subscribe({
      next: () => {
        this.alert.show = true;
        this.alert.message = 'Usuario eliminado';
        location.reload();
      },
      error: (err) => {
        console.log(err);
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
}