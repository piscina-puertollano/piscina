import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../utils/alert/alert.component';
import { InputTextModule } from 'primeng/inputtext';
import { Alert } from '../interfaces/alert';
import { FormsModule } from '@angular/forms';
import { TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Faltas } from '../interfaces/faltas';
import { User } from '../interfaces/user';
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

  alert: Alert;

  arrFaltas: Array<Faltas> = [];
  arrUsers: Array<User> = [];

  constructor(private service: FaltasService, private UserService: UserService, private router: Router) {
    this.user = {}
    this.faltas = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
    this.allClases();
    this.allUsers();
    this.allFaltas();
  }

  allClases() {
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
}
