/**
 * @author Marina Laguna
 */
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Alert } from '../../interfaces/alert';
import { User } from '../../interfaces/user';
import { PuntuacionService } from '../../services/puntuacion.service';
import { AlertComponent } from '../../utils/alert/alert.component';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { ModalCrearPuntuacionComponent } from '../modal-crear-puntuacion/modal-crear-puntuacion.component';
import { ModificarPuntuacionComponent } from '../modificar-puntuacion/modificar-puntuacion.component';
import { FilterService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { Puntuacion, Socio } from '../../interfaces/puntuacion';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-puntuacion',
  standalone: true,
  imports: [
    AlertComponent, TooltipModule, ToolbarModule, InputTextModule, 
    TableModule, DatePipe, CurrencyPipe, ProgressBarModule, FormsModule,
    ModalCrearPuntuacionComponent, ToastModule, ConfirmDialogModule, DialogComponent,
    DialogModule, ModificarPuntuacionComponent
  ],
  templateUrl: './puntuacion.component.html',
  styleUrl: './puntuacion.component.css',
  providers: [DialogService]
})
export class PuntuacionComponent {
  puntuacion?: Puntuacion;
  arrSocio: Array<User> = [];
  selectSocio!: Array<User>;
  arrPuntuacion: Array<Puntuacion> = [];
  selectPuntuacion!: Array<Puntuacion>;
  arrPhotoProfile: Array<any> = [];
  searchValue: string = '';
  loading: boolean = true;
  test?: Puntuacion;

  ref: DynamicDialogRef | undefined;

  constructor(private authService: AuthService, private filterService: FilterService, private puntuacionService: PuntuacionService, public dialogService: DialogService, private messageService: MessageService, private fileService: FileService){
  }

  /* openDialog(id: number){
      console.log("FUncion para poner puntuacion al socio")
  } */

  ngOnInit() {
    this.loading = false;
    this.socios();
  }

  clear(table: Table){
    table.clear();
  }

  socios() {
    this.puntuacionService.getSocios().subscribe({
      next: (users: any[]) => {
        this.arrSocio = users.map((user: User) => {
          const socio: Socio = { ...user };
          if (user.puntuacionesUsuario && user.puntuacionesUsuario.length > 0) {
            socio.nota = user.puntuacionesUsuario[0].nota;
          } else {
            socio.nota = null;
          }
          return socio;
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showImages() {
    for (let user of this.arrSocio) {
      let imageInfo = {
          id: user.image?.ruta,
          path: environment.photo_profile_path 
      };

      this.fileService.showImage(imageInfo).subscribe({
          next: (image: any | undefined) => {
              console.log(image);
              this.arrPhotoProfile.push({ id: user.image?.ruta, image: URL.createObjectURL(image) });
          },
          error: (err) => {
              console.error('Error al obtener la imagen:', err);
          }
      });
    }
  }
}
