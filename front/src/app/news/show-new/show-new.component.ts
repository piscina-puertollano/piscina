import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';
import { FileService } from '../../services/file.service';
import { File } from '../../interfaces/upload';

@Component({
  selector: 'app-show-new',
  standalone: true,
  imports: [],
  templateUrl: './show-new.component.html',
  styleUrl: './show-new.component.css',
})
export class ShowNewComponent implements OnInit {
  id = 0;
  news?: News;
  image: any;

  constructor(
    private routeActive: ActivatedRoute,
    private newsService: NewsService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.id = this.routeActive.snapshot.params['id'];
    this.showNew(this.id);
  }

  showNew(id: number) {
    this.newsService.show(id).subscribe({
      next: (news: News | undefined) => {
        this.news = news;
        let image: File = {
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
}
