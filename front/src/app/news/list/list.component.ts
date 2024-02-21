import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/news';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListNewsComponent implements OnInit {

  news?: News
  arrNews?: Array<News>
  constructor(private newsService: NewsService ) {}

  ngOnInit(): void {
      this.showAll()
  }
  showAll() {
    this.newsService.index().subscribe({
      next: (news: any | undefined) => {
        console.log(news)
        this.arrNews = news
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
