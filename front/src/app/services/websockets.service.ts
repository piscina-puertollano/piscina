import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment.development';

/**
 * @author: badr
 */

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
   
  // this.socket.on('created-new', (payload:any) => {
  //   console.log('Nueva noticia recibida:', payload);

  // });
}

  createNew(payload: any): void {
    this.socket.emit('create-new', payload, (response:any) => {
      console.log('Respuesta del servidor:', response);
    });
}


}
