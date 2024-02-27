import { ClaseService } from './../services/clase.service';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../utils/alert/alert.component';
import { InputTextModule } from 'primeng/inputtext';
import { Alert } from '../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Faltas } from '../interfaces/faltas';
import { User } from '../interfaces/user';
import { Clase } from '../interfaces/clase';
import { FaltasService } from '../services/faltas.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-faltas',
  standalone: true,
  imports: [TableModule, FormsModule, AlertComponent, ButtonModule, InputTextModule],
  templateUrl: './faltas.component.html',
  styleUrl: './faltas.component.css'
})
export class FaltasComponent implements OnInit {
  faltas: Faltas;
  user: User;
  clase: Clase;
  alert: Alert;

  arrFaltas: Array<Faltas> = [];
  arrUsers: Array<User> = [];

  constructor(private service: FaltasService, private UserService: UserService,  private ClaseService: ClaseService ,private router: Router) {
    this.user = {}
    this.clase = {}
    this.faltas = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.allClases();
    this.allUsers();
    this.allFaltas();
  }

  allFaltas() {
    this.service.allFaltas().subscribe({
      next: (clase: any | undefined) => {
        console.log(clase);
        if (clase.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar la informacion. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrFaltas = clase;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  allUsers() {
    this.UserService.allUsers().subscribe({
      next: (user: any | undefined) => {
        console.log(user)
        if (user.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar a los usuarios. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrUsers = user
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
        console.log(clase)
        if (clase.status >= 400) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar a los usuarios. Póngase en contacto con un adminsitrador.';
        } else {
          this.arrUsers = clase
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  edit(faltas: Faltas) {
    this.faltas = faltas
    console.log(faltas)
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
