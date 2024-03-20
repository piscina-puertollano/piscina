import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {
  User,
  Role,
  UserRol,
  SocioTutor,
  Alergias,
} from '../../../../interfaces/user';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileService } from '../../../../services/file.service';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../../services/user.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { environment } from '../../../../../environments/environment.development';
import { Files } from '../../../../interfaces/upload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { AlergiasService } from '../../../../services/alergias.service';

/**
 * @author: badr
 */

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule,
    MultiSelectModule,
    ToastModule,
    FileUploadModule
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
  providers: [DialogService, MessageService],
})
export class ShowComponent implements OnInit {
  user?: User;
  image?: any;
  rolTutor = environment.rolTutor;

  arrRoles?: Role[];
  arrAlergias?: Alergias[];
  arrAlergiasUser?: Alergias[];

  newAlergia?: string;
  showAlergia: boolean = false;

  arrAllSocios?: User[];
  arrAsignedSocios?: User[];
  idPhoto?: any

  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private fileService: FileService,
    private userService: UserService,
    private alergiasService: AlergiasService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.user = this.config.data.user;
    this.getAllSocios();
    this.getAsignedSocios();
    this.showAlergias();
    this.showRols();
    this.alergiasOfUser(this.user?.id);
    this.showImage(this.user!.image!.ruta);
  }

  showImage(id: string) {
    let image: Files = {
      id: id,
      where: environment.photo_profile_path,
    };
    this.fileService.showImage(image).subscribe({
      next: (image: any | undefined) => {
        this.image = URL.createObjectURL(image);
      },
    });
  }

  uploadFile(event: any){
    console.log(event);
    let file = event.files;

    file.forEach((element: any) => {
      const formData = new FormData();
      formData.append('archivo', element);

      this.fileService.saveImage(formData, environment.photo_profile_path).subscribe({
        next: (res: any) => {
          console.log(res)
          this.image = URL.createObjectURL(element)
          this.idPhoto = res.id;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  resetPass(){
    this.userService.resetPass(this.user!).subscribe({
      next:(mess: any)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Contraseña cambiada',
        })
      },error(err) {
          console.log(err);
      },
    })
  }

  updateUser() {
    if(this.idPhoto != null){
      this.user!.photo_profile = this.idPhoto
    }
    this.userService.updateUser(this.user!).subscribe({
      next: (user: any | undefined) => {
        this.saveAlergiasUser()
        let i = 0;
        let check = false;
        while (i < this.user!.roles!.length && !check) {
          if (this.user!.roles![i].id == this.rolTutor) {
            check = true;
            this.asignSocio();
          }
          i++;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Usuario actualizado',
        });
      },
      error: (error) => {
        console.log(error);
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
        console.log('socios', users);
        this.arrAllSocios = users;
      },
    });
  }

  getAsignedSocios() {
    this.userService.getAsignedSocios(this.user!.id!).subscribe({
      next: (users: any | undefined) => {
        console.log(users)
        this.arrAsignedSocios = users;
      },
    });
  }

  showRols() {
    this.userService.getAllRoles().subscribe({
      next: (roles: any | undefined) => {
        console.log(roles)
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
      next: (user: any | undefined) => {},
      error: (error) => {
        console.log(error);
      },
    });
  }

  showAlergias() {
    this.alergiasService.getAlergias().subscribe({
      next: (alergias: Array<Alergias> | undefined) => {
        console.log(alergias)
        this.arrAlergias = alergias;
      },
    });
  }

  alergiasOfUser(id: any) {
    this.alergiasService.getAlergiasOfUser(id).subscribe({
      next: (alergias: Array<Alergias> | undefined) => {
        this.arrAlergiasUser  = alergias
        console.log(alergias)
      },
    });
  }

  saveAlergiasUser() {
    let alergia = {
      id_user: this.user!.id!,
      alergias: this.arrAlergiasUser!,
    };
    this.alergiasService.saveAlergiasUser(alergia).subscribe({
      next: (user: any | undefined) => {
        console.log(user)
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
