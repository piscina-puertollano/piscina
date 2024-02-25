import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket?:any
   
  constructor() {
   this.socket = io(environment.websocket)
   this.socket.on('connect', () => {
    console.log('conectado')
  })
  this.socket.on('disconnect', () => {
    console.log("Desconectado");
  });
  this.socket.on("create-new", () => {
    console.log('Message from server: '+'hola');
  });
   
  }
}
