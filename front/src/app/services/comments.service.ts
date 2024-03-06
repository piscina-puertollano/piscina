import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Comment } from '../interfaces/news';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl+environment.getComments+'/'

  getComments(id: number):Observable<Array<Comment>|undefined> {
    return this.http.get<Array<Comment>>(this.url+id, {withCredentials: false}).pipe(
      catchError((error) => {
        return of(error)
      })
    )
  }

  createComment(comment:Comment):Observable<Comment|undefined> {
    return this.http.post<Comment>(this.url, comment, {withCredentials: true}).pipe(
      catchError((error) => {
        return of(error)
      })
    )
  }

  deleteComment(id:number):Observable<Comment|undefined> {
    return this.http.delete<Comment>(this.url+id, {withCredentials: true}).pipe(
      catchError((error) => {
        return of(error)
      })
    )
  }
}
