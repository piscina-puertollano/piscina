import { Component } from '@angular/core';
import { News, PostNews } from '../../../interfaces/news';
import { NewsService } from '../../../services/news.service';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { io } from 'socket.io-client';
import { WebsocketsService } from '../../../services/websockets.service';
import { EditorModule } from 'primeng/editor';

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
  ],
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.css',
  providers: [ConfirmationService, MessageService],
})
export class CreateNewComponent {
  news: PostNews;

  constructor(
    private newsService: NewsService,
    private websocket: WebsocketsService,
    private messageService: MessageService
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
          life:3000
        });
      }, 1000);
      return false;
    }
    return true;
  }

  createNew(eventEmiter: Boolean) {
    if (this.validateNewsFields()) {
      if (eventEmiter) {
        this.news!.main_image = 11;
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
            this.websocket.createNew(news)
            console.log(news);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
