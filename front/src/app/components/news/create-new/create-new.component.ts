import { Component } from '@angular/core';
import { PostNews } from '../../../interfaces/news';
import { NewsService } from '../../../services/news.service';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { WebsocketsService } from '../../../services/websockets.service';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../../environments/environment.development';
import { FileService } from '../../../services/file.service';

/**
 * @author: badr
 */

@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [
    DialogComponent,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    EditorModule,
    FileUploadModule,
  ],
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.css',
  providers: [ConfirmationService, MessageService],
})
export class CreateNewComponent {
  news: PostNews;
  image: any;
  idPhoto?: number;
  recomends: any;
  showRecomend = false

  constructor(
    private newsService: NewsService,
    private websocket: WebsocketsService,
    private messageService: MessageService,
    private fileService: FileService
  ) {
    this.news = {};
  }

  ngOnInit(): void {}

  validateNewsFields(): boolean {
    if (!this.news.title) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, introduce un título',
        });
      }, 1000);
      return false;
    }

    if (!this.news.body) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, introduce un contenido',
          life: 3000,
        });
      }, 1000);
      return false;
    }
    return true;
  }

  createNew(eventEmiter: Boolean) {
    if (this.validateNewsFields()) {
      if (eventEmiter) {
        this.news!.main_image = this.idPhoto;
        this.newsService.createNew(this.news!!).subscribe({
          next: (news: any | undefined) => {
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Correcto',
                detail: 'Noticia creada',
                life: 3000,
              });
            }, 1000);
            this.websocket.createNew(news);
            console.log(news);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }

  uploadFile(event: any) {
    console.log(event);
    let file = event.files;

    file.forEach((element: any) => {
      const formData = new FormData();
      formData.append('archivo', element);

      this.fileService.saveImage(formData, environment.news_path).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Imagen subida',
            life: 3000,
          });
          console.log(res);
          this.image = URL.createObjectURL(element);
          this.idPhoto = res.id;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  getRecomends(){
    this.newsService.getRecomendation().subscribe({
      next: (recomends: any) => {
        this.recomends = recomends;
        this.showRecomend = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
