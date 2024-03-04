import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../interfaces/news';
import { RouterLink } from '@angular/router';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { FileService } from '../../../services/file.service';
import { Files } from '../../../interfaces/upload';
import { Image } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    ToastModule,
    DialogComponent,
    RouterLink,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [MessageService, ConfirmationService, DialogService],
})
export class AdminComponent implements OnInit {
  news?: Array<News>;
  arrImages?: Array<any>;
  arrNews?: Array<News>;
  images?: Array<any>;
  selectNew?: News;
  searchValue: string = '';

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private newsService: NewsService,
    private fileService: FileService
  ) {}
  ngOnInit(): void {
    this.getNews();
  }

  deleteNew(eventEmiter: Boolean, id: number) {
    if (eventEmiter) {
      this.newsService.deleteNew(id).subscribe({
        next: (news: any | undefined) => {
          console.log(news);
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Noticia eliminada correctamente',
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getNews() {
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
        where: 'news',
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
}
