import { Component, OnInit, input } from '@angular/core';
import { User } from '../interfaces/user';
import { Alert } from '../interfaces/alert';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../utils/alert/alert.component';
import { DialogComponent } from '../utils/dialog/dialog.component';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, AlertComponent, DialogComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  user: User;
  alert: Alert;
  arrUsers: Array<User> = [];
  searchValue: string = ''
  whatSearch: string = ''


  constructor(private userService: UserService, private router: Router) {
    this.user = {};
    this.alert = new Alert();
  }

  ngOnInit(): void {
      this.allUsers()
  }

  search(event: Event) {
    let target = event.target as HTMLSelectElement
    let selected = target.id
    
    let input = event.target as HTMLInputElement

    if(input.value.length==0){
      this.allUsers()
    }
    console.log(selected)

    if(selected = 'searchEmail'){
      this.searchByEmail()
    }else{
      console.log('llego')
      if(typeof input.value != 'string'){
        this.searchById()
      }else{
        this.alert.show = true;
        this.alert.header = 'Error';
        this.alert.message =
          'Solo se admiten dígitos numericos para la búsqueda por número de socio.';
      }
    }
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

  updateUser(event: Boolean) {
    if(event){
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

  searchByEmail() {

    this.alert.show = false;
    this.userService.searchUserByEmail({email: this.searchValue}).subscribe({
      next: (user: any | undefined) => {
        console.log(user)
        if (user.length == 0 || user.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'Usuario no encontrado';
        } else {
          this.alert.show = false;
          this.arrUsers = []
          this.arrUsers = user!!
        }

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchById() {

    this.alert.show = false;
    this.userService.searchUserById({id: this.searchValue}).subscribe({
      next: (user: any | undefined) => {
        console.log(user)
        if (user.length == 0 || user.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'Usuario no encontrado';
        } else {
          this.alert.show = false;
          this.arrUsers = []
          this.arrUsers = user!!
        }

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id:any){
    this.alert.show = false;
    this.userService.deleteUser(id).subscribe({
      next: (user: any | undefined) => {
        console.log(user)
        if (user.length == 0 || user.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'El usuario no se ha podido eliminar';
        } else {
          this.alert.show = true;
          this.alert.header = 'Operación completada';
          this.alert.message =
            'Usuario eliminado correctamente';
          this.alert.type = 'success'
        }

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  hasRole(roleId: number): boolean {
    return this.user.roles!!.some(role => role.id === roleId);
  }

  onCheckboxChange(event: Event, roleId: number) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.user.roles!!.push({ id: roleId });
    } else {
      this.user.roles = this.user.roles!!.filter(role => role.id !== roleId);
    }

  }
}
