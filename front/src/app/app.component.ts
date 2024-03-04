import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadersComponent } from './components/headers/headers.component';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { SignupComponent } from './components/users/signup/signup/signup.component';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment.development';
import { WebsocketsService } from './services/websockets.service';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadersComponent, SignupComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AppComponent implements OnInit {
  title = 'Club deportivo';
  isLogged = false;

  private socket: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private websockets: WebsocketsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.socket = io(environment.websocket);

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('created-new', (payload: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Hay una nueva noticia disponible',
        detail: payload.title,
      });
      console.log(payload);
    });

    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };
    this.checkToken();
  }

  checkToken() {
    if (
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') as string).token != null
    ) {
      this.isLogged = true;
    }
  }
}
