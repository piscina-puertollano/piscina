import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/news';
import { CardModule } from 'primeng/card';
import { Image } from '../../interfaces/user';
import { File } from '../../interfaces/upload';
import { FileService } from '../../services/file.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListNewsComponent implements OnInit {

  news?: News
  arrNews?: Array<News>
  arrImages?:Array<any>
  images?:Array<any>
  
  constructor(private newsService: NewsService, private fileService: FileService ) {}

  ngOnInit(): void {
      this.showAll()
  }
  showAll() {
    this.newsService.index().subscribe({
      next: (news: any | undefined) => {
        console.log(news)
        this.arrImages = []
        this.images = []
        this.arrNews = news
        news.forEach((assetId:any) => {
          if(assetId.new_image != null){
            this.arrImages!.push(assetId.new_image)
          }
        })
        console.log(this.arrImages)
        this.showImages(this.arrImages!)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  showImages(arrFotos:Array<any>) {
    arrFotos.forEach((assetId:Image) => {
      let image:File = {
        id: assetId.ruta,
        where: 'news'
      }
      this.fileService.showImage(image).subscribe({
        next: (asset: any | undefined) => {
          console.log(asset)
          this.images!.push({ruta: assetId.ruta, image: URL.createObjectURL(asset)})
          console.log(this.images)
        },error: (err) => {
          console.log(err)
        }
      })
    })
  }
}
