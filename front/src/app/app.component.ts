import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadersComponent } from './headers/headers.component';
import { PrimeNGConfig } from 'primeng/api';
import { SignupComponent } from './users/signup/signup/signup.component';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeadersComponent,
    SignupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Club deportivo';
  isLogged = false;

  private socket: any;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.socket = io(environment.websocket);

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('created-new', () => {
      console.log('Disconnected from server');
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
