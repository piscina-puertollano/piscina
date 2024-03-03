import { ClasehasusuarioService } from './../services/clasehasusuario.service';
import { claseUsuario } from './../interfaces/claseUsuario';
import { User } from './../interfaces/user';
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
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CategoriaClasesService } from '../services/categoria-clases.service';
import { CategoriaClases } from '../interfaces/categoriaClases';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-asignar-clases-usuarios',
  standalone: true,
  imports: [TableModule, FormsModule, AlertComponent, ToastModule, DropdownModule, ButtonModule, InputTextModule, DialogModule, RouterLink, InputTextareaModule],
  templateUrl: './asignar-clases-usuarios.component.html',
  styleUrl: './asignar-clases-usuarios.component.css'
})
export class AsignarClasesUsuariosComponent implements OnInit {
  alert: Alert;
  searchValue: string = '';
  whatSearch: string = '';

  clase: Clase;
  claseUsuario: claseUsuario;
  arrClaseUsuario: Array<claseUsuario> = [];

  constructor(private service: ClaseService, private UsuarioService: UserService, private ClasehasusuarioService: ClasehasusuarioService, private relacion: ClasehasusuarioService, private router: Router) {
    this.alert = new Alert();
    this.clase = {}
    this.claseUsuario = {}
    
 }

 ngOnInit(): void {
  this.allClasesUsuarios();
 }
 allClasesUsuarios() {
  this.ClasehasusuarioService.allRelacion().subscribe({
    next: (categoria: any | undefined) => {
      console.log(categoria);
      if (categoria.status >= 400) {
        this.alert.show = true;
        this.alert.header = 'Error';
        this.alert.message =
          'No se han podido cargar la informacion. Póngase en contacto con un administrador.';
      } else {
        this.arrClaseUsuario = categoria;
        console.log(this.arrClaseUsuario)
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
}  

  deleteRelacion(id: any) {
    this.ClasehasusuarioService.deleteRelacion(id).subscribe({
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
}