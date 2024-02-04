import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Alert } from '../interfaces/alert';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  user: User;
  alert: Alert;
  arrUsers: Array<User> = [];

  constructor(private userService: UserService, private router: Router) {
    this.user = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
      this.allUsers()
  }

  search() {
    this.userService.searchUserByEmail(this.user!.email!).subscribe({
      next: (user: any | undefined) => {
        console.log(user)

        if (user.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo';
        } else {
          this.arrUsers = user
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
 
  allUsers() {
    this.userService.allUsers().subscribe({
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

  showUser(id:any) {
    this.userService.showUser(id).subscribe({
      next: (user: any | undefined) => {
        this.user = user
        console.log(user)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe({
      next: (user: any | undefined) => {
        console.log(user)
        this.user = user
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
