import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Role, User } from '../../../../interfaces/user';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../../services/user.service';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { environment } from '../../../../../environments/environment.development';

/**
 * @author: badr
 */

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    CheckboxModule,
    MultiSelectModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [MessageService],
})
export class SignupComponent implements OnInit{
  user?: User;
  uploadedFiles: any[] = [];

  arrRoles?: Role[];
  rolTutor = environment.rolTutor;
  arrAllSocios?: User[];
  arrAsignedSocios: User[];

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.user = {};
    this.arrAsignedSocios = [];
  }

  ngOnInit(): void {
      this.showRols();
      this.getAllSocios()
  }

  signup() {
    this.userService.signup(this.user!).subscribe({
      next: (user: any | undefined) => {
        console.log(user);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Usuario creado',
        });
      },
    });
  }

  getAllSocios() {
    this.userService.getAllSocios().subscribe({
      next: (users: any | undefined) => {
        for (let user of users) {
          if (user.id == this.user!.id) {
            users.splice(users.indexOf(user), 1);
          }
        }
        console.log('all ', users);
        this.arrAllSocios = users;
      },
    });
  }

  showRols() {
    this.userService.getAllRoles().subscribe({
      next: (roles: any | undefined) => {
        console.log(roles);
        this.arrRoles = roles;
      },
    });
  }
}
