import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { User, Role, UserRol, SocioTutor } from '../../../interfaces/user';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileService } from '../../../services/file.service';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../services/user.service';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { environment } from '../../../../environments/environment.development';
import { File } from '../../../interfaces/upload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

/**
 * @author: badr
 */

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputSwitchModule, ButtonModule, MultiSelectModule, ToastModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
  providers: [DialogService, MessageService]
})
export class ShowComponent implements OnInit {
  user?: User;
  image?: any;
  rolTutor = environment.rolTutor

  arrRoles?:Role[]

  arrAllSocios?: User[]
  arrAsignedSocios?: User[]
  arrDeselectedSocios?: SocioTutor[]
  @Output() updateUSer = new EventEmitter<User>();
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private fileService: FileService,
    private userService: UserService,
    private messageService: MessageService
  ) {}



  ngOnInit() {
    this.user = this.config.data.user;
    this.getAllSocios();
    this.getAsignedSocios();
    this.showRols()
    this.showImage(this.user!.image!.ruta);
    console.log(this.config);
  }

  showImage(id: string) {
    let image: File = {
      id: id,
      where: environment.photo_profile_path
    }
    this.fileService.showImage(image).subscribe({
      next: (image: any | undefined) => {
        console.log(image);
        this.image = URL.createObjectURL(image);
      },
    });
  }

  updateUser() {    
    this.userService.updateUser(this.user!).subscribe({
      next: (user: any | undefined) => {
        console.log(this.user!.roles)
        let i = 0
        let check = false
        while (i < this.user!.roles!.length && !check) {
          if (this.user!.roles![i].id == this.rolTutor) {

            check = true
           this.asignSocio()

          }
          i++
        }
    
        this.messageService.add({
          severity: 'success',
          summary: 'Operación completada',
          detail: 'Usuario actualizado',
        })
        console.log(user);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllSocios() {
    this.userService.getAllSocios().subscribe({
      next: (users: any | undefined) => {

        for(let user of users){
          if(user.id == this.user!.id){
            users.splice(users.indexOf(user),1)
          }
        }
        console.log('all ',users);
        this.arrAllSocios = users;
      },
    });
  }

  getAsignedSocios() {
    this.userService.getAsignedSocios(this.user!.id!).subscribe({
      next: (users: any | undefined) => {
        console.log('asigned ',users)
        this.arrAsignedSocios = users;
      },
    });
  }

  showRols(){
    this.userService.getAllRoles().subscribe({
      next: (roles: any | undefined) => {
        console.log(roles)
        this.arrRoles = roles;
      },
    });
  }

  asignSocio() {
    console.log('llego')
    let socioTutor:SocioTutor = {
      id_tutor:this.user!.id!,
      id_socio: this.arrAsignedSocios!
    }
    this.userService.asignSocio(socioTutor).subscribe({
      next: (user: any | undefined) => {
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}

