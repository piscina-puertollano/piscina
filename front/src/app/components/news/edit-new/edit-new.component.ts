import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { CommentsService } from '../../../services/comments.service';
import { FileService } from '../../../services/file.service';
import { Comment, News } from '../../../interfaces/news';
import { Files } from '../../../interfaces/upload';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../../environments/environment.development';
import { MessageService } from 'primeng/api';

/**
 * @author: badr
 */

@Component({
  selector: 'app-edit-new',
  standalone: true,
  imports: [
    ToastModule,
    FormsModule,
    DialogComponent,
    EditorModule,
    InputTextModule,
    PanelModule,
    FileUploadModule,
    DialogComponent
  ],
  templateUrl: './edit-new.component.html',
  styleUrl: './edit-new.component.css',
  providers: [MessageService]
})
export class EditNewComponent implements OnInit {
  id = 0;
  news?: News;
  image: any;
  comments?: Array<Comment>;
  idPhoto?: number;

  constructor(
    private routeActive: ActivatedRoute,
    private newsService: NewsService,
    private commentsService: CommentsService,
    private fileService: FileService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = this.routeActive.snapshot.params['id'];
    this.showNew(this.id);
    this.showComments(this.id);
  }

  showNew(id: number) {
    this.newsService.show(id).subscribe({
      next: (news: News | undefined) => {
        this.news = news;
        let image: Files = {
          id: news?.new_image.ruta,
          where: 'news',
        };
        this.fileService.showImage(image).subscribe({
          next: (image: any) => {
            console.log(image);
            this.image = URL.createObjectURL(image);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showComments(id: number) {
    this.commentsService.getComments(id).subscribe({
      next: (comments: Array<Comment> | undefined) => {
        console.log(comments);
        this.comments = comments;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editNew(eventEmiter: Boolean) {
    if (eventEmiter) {
      if(this.idPhoto != undefined){
        this.news!.main_image = this.idPhoto
      }
      this.newsService.updateNew(this.news!).subscribe({
        next: (news: News | undefined) => {
          console.log(news);
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Noticia editada',
            life: 3000,
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  uploadFile(event: any){
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

  deleteComment(eventEmiter: Boolean, id:any){
    if(eventEmiter){
      this.commentsService.deleteComment(id).subscribe({
        next: (res: any) => {
          console.log(res)
          this.showComments(this.id)
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
