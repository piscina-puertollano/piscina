import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../interfaces/news';
import { CardModule } from 'primeng/card';
import { Image } from '../../../interfaces/user';
import { Files } from '../../../interfaces/upload';
import { FileService } from '../../../services/file.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

/**
 * @author: badr
 */

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListNewsComponent implements OnInit {
  news?: News;
  arrNews?: Array<News>;
  arrImages?: Array<any>;
  images?: Array<any>;
  randNew?: News;
  randImage: any;
  popularNew?: News;
  popularImage: any;
  fastReed?: News;

  constructor(
    private newsService: NewsService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('categories') &&
      JSON.parse(localStorage.getItem('categories') as string).length >= 10
    ) {
      this.getAfinNews();
    } else {
      this.showAll();
    }
    this.getRandNew();
    this.getPopularNews();
    this.getFastReedNew();
  }

  showAll() {
    this.newsService.index().subscribe({
      next: (news: any | undefined) => {
        console.log(news);
        this.arrImages = [];
        this.images = [];
        this.arrNews = news;
        news.forEach((assetId: any) => {
          if (assetId.new_image != null) {
            this.arrImages!.push(assetId.new_image);
          }
        });
        console.log(this.arrImages);
        this.showImages(this.arrImages!);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showImages(arrFotos: Array<any>) {
    arrFotos.forEach((assetId: Image) => {
      let image: Files = {
        id: assetId.ruta,
        where: environment.news_path,
      };
      this.fileService.showImage(image).subscribe({
        next: (asset: any | undefined) => {
          console.log(asset);
          this.images!.push({
            ruta: assetId.ruta,
            image: URL.createObjectURL(asset),
          });
          console.log(this.images);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  addAfinCategory(category: string) {
    let categories = localStorage.getItem('categories') as string;

    if (categories == null) {
      localStorage.setItem(
        'categories',
        JSON.stringify([{ category: category }])
      );
    } else {
      let parsedCategories = JSON.parse(categories);
      if (parsedCategories.length >= 20) {
        localStorage.clear();
      }
      parsedCategories.push({ category: category });
      localStorage.setItem('categories', JSON.stringify(parsedCategories));
    }
  }

  getAfinNews() {
    this.newsService.getAfinNews().subscribe({
      next: (news: any | undefined) => {
        console.log(news);
        this.arrNews = news;
        this.arrImages = [];
        this.images = [];
        this.arrNews = news;
        news.forEach((assetId: any) => {
          if (assetId.new_image != null) {
            this.arrImages!.push(assetId.new_image);
          }
        });
        console.log(this.arrImages);
        this.showImages(this.arrImages!);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRandNew() {
    this.newsService.getRandNews().subscribe({
      next: (news: any | undefined) => {
        this.randNew = news;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPopularNews() {
    this.newsService.getPopularNews().subscribe({
      next: (news: any | undefined) => {
        console.log(news);
        this.popularNew = news[0];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getFastReedNew() {
    this.newsService.getFastReed().subscribe({
      next: (news: any | undefined) => {
        this.fastReed = news[Math.floor(Math.random() * news.length)];
        console.log('llego', this.fastReed!.new_image.ruta);
        this.showImages([{ ruta: this.fastReed!.new_image.ruta }]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
