import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { News, PostNews } from '../interfaces/news';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private socket: any
  constructor(private http: HttpClient) {
    this.socket = io(environment.websocket);

   }

  urlIndex = environment.baseUrl+environment.showNews
  urlCreate = environment.baseUrl+environment.showNew

  index(): Observable<Array<News> | undefined> {
    return this.http.get<News>(this.urlIndex,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  createNew(news:PostNews): Observable<News | undefined> {
    return this.http.post<PostNews>(this.urlCreate, news, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  notificar(){
    console.log('funca')
    this.socket.emit('create-new', 'prueba')
  }

  
}
