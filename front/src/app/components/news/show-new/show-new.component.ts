import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, News } from '../../../interfaces/news';
import { NewsService } from '../../../services/news.service';
import { FileService } from '../../../services/file.service';
import { Files } from '../../../interfaces/upload';
import { CommentsService } from '../../../services/comments.service';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { ToastModule } from 'primeng/toast';

/**
 * @author: badr
 */

@Component({
  selector: 'app-show-new',
  standalone: true,
  imports: [PanelModule, InputTextareaModule, FormsModule, ButtonModule, ToastModule],
  templateUrl: './show-new.component.html',
  styleUrl: './show-new.component.css',
  providers: [MessageService]
})
export class ShowNewComponent implements OnInit {
  id = 0;
  news?: News;
  image: any;
  comments?: Array<Comment>;
  newComment: string = ""
  responseComment: string = ""
  respond = false

  constructor(
    private routeActive: ActivatedRoute,
    private newsService: NewsService,
    private commentsService: CommentsService,
    private fileService: FileService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.comments = undefined
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
        }
        this.fileService.showImage(image).subscribe({
          next: (image: any) => {
            console.log(image);
            this.image = URL.createObjectURL(image)
          }
        })
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showComments(id: number) {
    this.commentsService.getComments(id).subscribe({
      next: (comments: any) => {
        if(comments != undefined){
          this.comments = comments;
          console.log(comments);
        }else{
          this.comments = undefined
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createComment() {
    let newComment:Comment = {
      id_new: this.id,
      comment: this.newComment,
    } 
    this.commentsService.createComment(newComment).subscribe({
      next: (comment: any | undefined) => {
        if(comment != undefined){
          console.log(comment);
          this.showComments(this.id);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  respondComment(id: any) {
    let newComment:Comment = {
      id_new: this.id,
      respond_to: id,
      comment: this.responseComment,
    }

    this.commentsService.createComment(newComment).subscribe({
      next: (comment: any | undefined) => {
        if(comment != undefined){
          console.log(comment);
          this.showComments(this.id);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setCounter(counter:any){
    this.newsService.setCounter(counter).subscribe({
      next: (news: News | undefined) => {
        console.log(news)
        this.messageService.add({
          severity:'success', 
          summary:'Correcto',
          detail:'Ha interactuado'
        });
        this.news = news

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isAuth(){
    return this.authService.isLoggedIn()
  }
}
