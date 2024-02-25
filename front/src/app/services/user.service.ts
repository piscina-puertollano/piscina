import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Role, SocioTutor, User, UserRol } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private baseUrl : string = environment.baseUrl
  private urlLogin : string = this.baseUrl+environment.login
  private urlUpdate : string = this.baseUrl+environment.updateUser
  private urlSignup : string = this.baseUrl+environment.showUser
  private urSearch : string = this.baseUrl+'/search'
  private urAllUsers : string = this.baseUrl+environment.allUsers
  private urAllSocios: string = this.baseUrl+environment.showSocios
  private urlAsingSocio: string = this.baseUrl+environment.asignSocio
  private urlRemoveSocio: string = this.baseUrl+environment.removeSocio
  private urlShowUser : string = this.baseUrl+environment.showUser
  private urlShowSociosOfTutor : string = this.baseUrl+environment.showSociosOfTutor
  private urlAllRols: string = this.baseUrl+environment.showRols

  login(user:User): Observable<User | undefined> {
    return this.http.post<User>(this.urlLogin,user,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  signup(user:User): Observable<User | undefined> {
    return this.http.post<User>(this.urlSignup, user, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  searchUserByEmail(email:any): Observable<User | undefined> {
    return this.http.post<User>(this.urSearch,email,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  searchUserById(id:any): Observable<User | undefined> {
    return this.http.post<User>(this.urSearch,id,{withCredentials:false}).pipe(
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

  showUser(id:any): Observable<User | undefined> {
    return this.http.get<User>(this.urlShowUser+'/'+id).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
  updateUser(user:User): Observable<User | undefined> {
    return this.http.put<User>(this.urlShowUser, user).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  deleteUser(userId: number): Observable<User | undefined> {
    return this.http.delete<User>(this.urlShowUser+userId).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getAllSocios(): Observable<Array<User> | undefined> {
    return this.http.get<User>(this.urAllSocios).pipe(
      catchError((error) =>{
        return of(error)
      }
    ))
  }

  getAsignedSocios(userId: number): Observable<Array<User> | undefined> {
    return this.http.get<User>(this.urlShowSociosOfTutor+'/'+userId).pipe(
      catchError((error) =>{
        return of(error)
      }
    ))
  }

  getAllRoles(): Observable<Array<Role> | undefined> {
    return this.http.get<Role>(this.urlAllRols).pipe(
      catchError((error) =>{
        return of(error)
      }
    ))
  }

  asignSocio(socioTutor:SocioTutor): Observable<SocioTutor | undefined> {
    return this.http.post<SocioTutor>(this.urlAsingSocio, socioTutor).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

}
