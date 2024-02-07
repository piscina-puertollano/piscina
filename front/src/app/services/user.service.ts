import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private baseUrl : string = environment.baseUrl
  private urlLogin : string = this.baseUrl+'/login'
  private urSearch : string = this.baseUrl+'/search'
  private urAllUsers : string = this.baseUrl+'/users'
  private urlShowUser : string = this.baseUrl+'/user/'

  login(user:User): Observable<User | undefined> {
    return this.http.post<User>(this.urlLogin,user,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  searchUserByEmail(email:any): Observable<Array<User> | undefined> {
    return this.http.post<User>(this.urSearch,email,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  searchUserById(email:any): Observable<Array<User> | undefined> {
    return this.http.post<User>(this.urSearch,email,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  allUsers(): Observable<Array<User> | undefined> {
    return this.http.get<User>(this.urAllUsers).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  showUser(id:any): Observable<Array<User> | undefined> {
    return this.http.get<User>(this.urlShowUser+id).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
  updateUser(user:User): Observable<Array<User> | undefined> {
    return this.http.put<User>(this.urlShowUser, user).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}
