import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Alergias } from '../interfaces/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AlergiasService {

  constructor(private http: HttpClient) { }

  private baseUrl : string = environment.baseUrl
  private urlAllAlergias: string = this.baseUrl+environment.getAllAlergias
  private urlAllAlergiasOfUser: string = this.baseUrl+environment.getAllAlergiasOfUser

  getAlergias():Observable<Array<Alergias> | undefined> {
    return this.http.get<Array<Alergias>>(this.urlAllAlergias, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getAlergiasOfUser(id:number):Observable<Array<Alergias> | undefined> {
    return this.http.get<any>(this.urlAllAlergias+'/'+id, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  saveAlergiasUser(alergias: any):Observable<any | undefined> {
    return this.http.post<any>(this.urlAllAlergiasOfUser, alergias, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}
