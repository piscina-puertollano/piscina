import { Component } from '@angular/core';
import { News, PostNews } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [DialogComponent, FormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.css',
  providers: [ConfirmationService, MessageService],

})
export class CreateNewComponent {
  
  news?: PostNews

  constructor(private newsService: NewsService ) {
  }
  
  ngOnInit(): void {
    this.news = {
      title:'',
      id_user:1,
      body:'',
      main_image:1

    }
  }
  createNew(eventEmiter: Boolean) {
    if(eventEmiter){
      this.news!.id_user = 1
      this.news!.main_image = 2
      this.newsService.createNew(this.news!!).subscribe({
        next: (news: any | undefined) => {
          this.newsService.notificar()
          console.log(news)
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

}
