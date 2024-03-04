import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { CommentsService } from '../../../services/comments.service';
import { FileService } from '../../../services/file.service';
import { News } from '../../../interfaces/news';
import { Files } from '../../../interfaces/upload';

@Component({
  selector: 'app-edit-new',
  standalone: true,
  imports: [],
  templateUrl: './edit-new.component.html',
  styleUrl: './edit-new.component.css'
})
export class EditNewComponent implements OnInit {
  id = 0;
  news?: News;
  image: any;
  comments?: Array<Comment>;

  constructor(
    private routeActive: ActivatedRoute,
    private newsService: NewsService,
    private commentsService: CommentsService,
    private fileService: FileService
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
        console.log(comments);
        this.comments = comments;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
