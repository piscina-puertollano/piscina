import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, News } from '../../../interfaces/news';
import { NewsService } from '../../../services/news.service';
import { FileService } from '../../../services/file.service';
import { Files } from '../../../interfaces/upload';
import { CommentsService } from '../../../services/comments.service';
import { PanelModule } from 'primeng/panel';

/**
 * @author: badr
 */

@Component({
  selector: 'app-show-new',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './show-new.component.html',
  styleUrl: './show-new.component.css',
})
export class ShowNewComponent implements OnInit {
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
