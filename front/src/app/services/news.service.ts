import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { News, PostNews } from '../interfaces/news';
import { io } from 'socket.io-client';

/**
 * @author: badr
 */

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
  urlShow = environment.baseUrl+environment.showNew
  urlAfin = environment.baseUrl+environment.showAfinNews
  urlRand = environment.baseUrl+environment.showRandNews
  urlPopular = environment.baseUrl+environment.showPopularNews
  urlLatest = environment.baseUrl+environment.showLatestNews
  urlCounter = environment.baseUrl+environment.counter
  urlRecomend = environment.baseUrl+environment.recomend
  urlFastReed = environment.baseUrl+environment.fastReed

  index(): Observable<Array<News> | undefined> {
    return this.http.get<News>(this.urlIndex,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  show(id:number): Observable<News | undefined> {
    return this.http.get<News>(this.urlShow+'/'+id,{withCredentials:false}).pipe(
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

  updateNew(news:News): Observable<News | undefined> {
    return this.http.put<News>(this.urlShow+'/'+news.id, news, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  deleteNew(id:number): Observable<News | undefined> {
    return this.http.delete<News>(this.urlShow+'/'+id, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  notificar(){
    this.socket.emit('create-new', 'prueba')
  }


  getAfinNews(): Observable<News | undefined> {
    let categories = {
      categories: JSON.parse(localStorage.getItem('categories')!)
    }
    return this.http.post<News>(this.urlAfin,categories, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getRandNews(): Observable<News | undefined> {
    return this.http.get<News>(this.urlRand, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getPopularNews(): Observable<News | undefined> {
    return this.http.get<News>(this.urlPopular, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getLatestNews(): Observable<News | undefined> {
    return this.http.get<News>(this.urlLatest, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  setCounter(counter:any): Observable<News | undefined> {
    return this.http.post<News>(this.urlCounter, counter ,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getRecomendation(): Observable<any | undefined> {
    return this.http.get<any>(this.urlRecomend, {withCredentials:true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getFastReed(): Observable<News | undefined> {
    return this.http.get<News>(this.urlFastReed, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
  
}
