/**
 * @author Marina Laguna
 */
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../../environments/environment.development';
import { Puntuacion, Socio } from '../../../interfaces/puntuacion';
import { Image, User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { FileService } from '../../../services/file.service';
import { PuntuacionService } from '../../../services/puntuacion.service';
import { AlertComponent } from '../../../utils/alert/alert.component';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { CrearPuntuacionComponent } from '../crear-puntuacion/crear-puntuacion.component';
import { ModificarPuntuacionComponent } from '../modificar-puntuacion/modificar-puntuacion.component';
import { AsignarEntrenamientosComponent } from '../../entrenamientos/asignar-entrenamientos/asignar-entrenamientos.component';
import { Files } from '../../../interfaces/upload';

@Component({
  selector: 'app-puntuacion',
  standalone: true,
  imports: [
    AlertComponent, TooltipModule, ToolbarModule, InputTextModule, 
    TableModule, DatePipe, CurrencyPipe, ProgressBarModule, FormsModule,
    ToastModule, ConfirmDialogModule, DialogComponent,
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
  asignarEntreBtn: boolean = false;
  arrImages?: Array<any>
  images?: Array<any>

  ref: DynamicDialogRef | undefined;
  dialog: any;

  constructor(private authService: AuthService, private filterService: FilterService, private puntuacionService: PuntuacionService, public dialogService: DialogService, private messageService: MessageService, private fileService: FileService){
  }

  ngOnInit() {
    this.loading = false;
    this.socios();
  }

  openDialog(id: number, tienePuntuacion: boolean) {
    if (typeof id === 'number') {
       if (tienePuntuacion) {
         this.puntuacionService.getPuntuacionId({id}).subscribe(
           (puntuacion: Puntuacion[] | undefined) => {
             console.log(puntuacion);
             if (puntuacion) {
               this.ref = this.dialogService.open(ModificarPuntuacionComponent, {
                 header: 'Modificación de Calificación',
                 modal: true,
                 breakpoints: {
                   '960px': '75vw',
                   '640px': '90vw'
                 },
                 data: {
                   puntuacion: puntuacion, 
                   socioId: id
                 }
               });
             }
           },
           (error) => {
             console.error('Error al obtener la puntuación:', error);
           }
         );
       } else {
         this.ref = this.dialogService.open(CrearPuntuacionComponent, {
           header: 'Nueva Calificación',
           modal: true,
           breakpoints: {
             '960px': '75vw',
             '640px': '90vw'
           },
           data: {
             socioId: id,
            }
          });
       }
    }
   }

  socios() {
    this.puntuacionService.getSocios().subscribe({
       next: (users: any[]) => {
         this.arrSocio = users.map((user: User) => {
           const socio: Socio = { ...user };
           if (user.puntuacionesUsuario && user.puntuacionesUsuario.length > 0) {
             socio.nota = user.puntuacionesUsuario[0].nota;
             socio.mostrarBoton = socio.nota !== undefined && socio.nota < 5;
           } else {
             socio.nota = null;
             socio.mostrarBoton = false
           }
           return socio;
         });
       },
       error: (err) => {
         console.log(err);
       }
    });
   }

  openAsignarEntre(socioId: number) {
    const socio = this.arrSocio.find(user => user.id === socioId);
    const nota = socio?.puntuacionesUsuario?.[0]?.nota;
   
    this.ref = this.dialogService.open(AsignarEntrenamientosComponent, {
       header: 'Asignar Entrenamiento',
       modal: true,
       breakpoints: {
         '960px': '75vw',
         '640px': '90vw'
       },
       data: {
         socioId: socioId,
         nota: nota 
       }
    });
   }
   
}
