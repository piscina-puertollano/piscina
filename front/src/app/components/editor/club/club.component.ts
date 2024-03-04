import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { LandingService } from '../../../services/landing.service';
import { Club, Estructura } from '../../../interfaces/landing';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { Files } from '../../../interfaces/upload';
import { FileService } from '../../../services/file.service';
import { environment } from '../../../../environments/environment.development';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';

/**
 * @author: badr
 */

@Component({
  selector: 'app-club-edit',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogComponent,
    ToastModule,
    ToolbarModule,
    AvatarModule,
    TableModule,
    FileUploadModule,
    ImageModule,
  ],

  templateUrl: './club.component.html',
  styleUrl: './club.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ClubEditComponent implements OnInit {
  text: string | undefined;
  title: string | undefined;
  directiva: Estructura[] | undefined;
  fotos?: Array<any>;
  arrPhotos?: Array<any>;
  noText = 'No hay imagenes';
  mutiple = true;
  updatePhotos?:any;
  arrUpdatePhotos?:any;

  club?: Club;
  galery?: Club;

  constructor(
    private landingService: LandingService,
    private messageService: MessageService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.fotos = [];
    this.showGalery();
    this.showHistory();
  }

  showHistory() {
    this.landingService.showSection('history').subscribe({
      next: (club: Club | undefined) => {
        this.club = club;
        this.text = club?.history;
        this.title = club?.title;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update(confirm: Boolean) {
    if (confirm) {
      this.club!.history = this.text;
      this.club!.title = this.title;
      this.updateFunction(this.club!)
    } else {
      console.log('cancelado');
    }
  }

  deleteImage(confirm: Boolean, ruta: string, id: any) {
    if (confirm) {
      let i = 0;
      while (i < this.arrPhotos!.length) {
        console.log(this.arrPhotos![i])
        if (this.arrPhotos![i] == id) {
          this.arrPhotos!.splice(i, 1);
        } else {
          i++;
        }
      }
      debugger
      let file: Files = {
        id: ruta,
        where: environment.landing_path,
      };
      this.fileService.deleteImage(file).subscribe({
        next: (res: any) => {
          console.log(res);
          let club: Club = {
            _id: this.galery?._id,
            assets: this.arrPhotos!,
          };
          this.fotos = []
          this.landingService.updateClub(club).subscribe({
            next: (club: Club | undefined) => {
              console.log(club);
              this.showImages(club?.fotos!, club?.assets);
            },
            error: (err) => {
              console.log(err);
            },
          });
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'La imagen ha sido eliminada correctamente',
              life: 3000,
            });
          }, 1000);
        },
      });
    }
  }

  showGalery() {
    this.landingService.showSection('galeria').subscribe({
      next: (club: Club | undefined) => {
        this.galery = club;
        this.arrPhotos = club?.assets;
        if (club?.assets.length >= 1) {
          this.showImages(club?.fotos!, club?.assets);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showImages(arrFotos: Array<any>, assetId: Array<any>) {
    for (let i = 0; i < arrFotos.length; i++) {
      let image: Files = {
        id: arrFotos[i].ruta,
        where: environment.landing_path,
      };
      this.fileService.showImage(image).subscribe({
        next: (asset: any | undefined) => {
          console.log(assetId[i]);
          this.fotos!.push({
            id: assetId[i],
            ruta: image.id,
            image: URL.createObjectURL(asset),
          });
          console.log(this.fotos);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onUpload(event: any) {
    this.updatePhotos = [] 
    this.fotos = []

    let file = event.files;

    file.forEach((element: any) => {
      const formData = new FormData();
      formData.append('archivo', element);

      this.fileService.saveImage(formData, environment.landing_path).subscribe({
        next: (res: any) => {

          this.fotos?.push({
            image: URL.createObjectURL(element),
            ruta: res.ruta,
            id: res.id,
          });

          this.updatePhotos.push(res.id);
          this.galery!.assets= this.updatePhotos
          this.updateFunction(this.galery!);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  updateFunction(section: any) {
    this.landingService.updateClub(section).subscribe({
      next: (club: Club | undefined) => {
        console.log(club);
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Aceptado',
        detail: 'Su solicitud ha sido procesada correctamente',
        life: 3000,
      });
    }, 2000);
  }
}
