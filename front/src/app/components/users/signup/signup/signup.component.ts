import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../../../environments/environment.development';
import { Role, SocioTutor, User } from '../../../../interfaces/user';
import { FileService } from '../../../../services/file.service';
import { UserService } from '../../../../services/user.service';

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
    FileUploadModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  user?: User;
  uploadedFiles: any[] = [];

  arrRoles?: Role[];
  rolTutor = environment.rolTutor;
  arrAllSocios?: User[];
  arrAsignedSocios: User[];
  idPhoto = 1;
  fotos?: any;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private fileService: FileService
  ) {
    this.user = {};
    this.arrAsignedSocios = [];
  }

  ngOnInit(): void {
    this.showRols();
    this.getAllSocios();
  }

  uploadFile(event: any) {
    console.log(event);
    let file = event.files;

    file.forEach((element: any) => {
      const formData = new FormData();
      formData.append('archivo', element);

      this.fileService
        .saveImage(formData, environment.photo_profile_path)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.fotos = {
              image: URL.createObjectURL(element),
              ruta: res.ruta,
              id: res.id,
            };
            this.idPhoto = res.id;
          },
          error: (err) => {
            console.log(err);
          },
        });
    });
  }

  signup() {
    if (this.idPhoto != null) {
      this.user!.photo_profile = this.idPhoto;
    }
    this.userService.signup(this.user!).subscribe({
      next: (user: any | undefined) => {
        this.user!.id! = user.id;
        console.log(user);
        this.asignSocio();
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
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

  asignSocio() {
    let socioTutor: SocioTutor = {
      id_tutor: this.user!.id!,
      id_socio: this.arrAsignedSocios!,
    };
    this.userService.asignSocio(socioTutor).subscribe({
      next: (user: any | undefined) => {
        console.log(user);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
