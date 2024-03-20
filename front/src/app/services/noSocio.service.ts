// Gonzalo Martinez Haro
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { NoSocio } from '../interfaces/noSocio';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class noSocioService { 
    
    constructor(private http: HttpClient) { }
    private baseUrl : string = environment.baseUrl
    private urlGetNoSocios : string = this.baseUrl + environment.getsNoSocios
    private urlGetNoSocio : string = this.baseUrl + environment.getPostUpdateDeleteNoSocios
    private urlUpdateNoSocio : string = this.baseUrl + environment.getPostUpdateDeleteNoSocios
    private urlDeleteNoSocio: string = this.baseUrl + environment.getPostUpdateDeleteNoSocios
    private urlInsertNoSocio : string = this.baseUrl + environment.getPostUpdateDeleteNoSocios
    private urlGetNoSociosConIdEvento: string = this.baseUrl + environment.getNosociosConIdEvento


    getNoSocios(): Observable<Array<NoSocio> | undefined> {
        return this.http.get<NoSocio>(this.urlGetNoSocios).pipe(
            catchError((error) =>{
              return of(error)
            })
          )
    }

    getNoSocio(id:any): Observable<NoSocio | undefined> {
        return this.http.get<NoSocio>(this.urlGetNoSocio+id).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      insertNoSocio(noSocio:NoSocio,id:any): Observable<NoSocio | undefined> {
        return this.http.post<NoSocio>(this.urlInsertNoSocio+id, noSocio,{withCredentials: false}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }


      updateNoSocio(noSocio:NoSocio): Observable<NoSocio | undefined> {
        
        return this.http.put<NoSocio>(this.urlUpdateNoSocio+noSocio.id, noSocio,{withCredentials: true}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      deleteNoSocio(id: any): Observable<NoSocio | undefined> {
        return this.http.delete<NoSocio>(this.urlDeleteNoSocio+id,{withCredentials: true}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      getNoSociosConIdEvento(id: any): Observable<NoSocio | undefined> {
        return this.http.get<NoSocio>(this.urlGetNoSociosConIdEvento+id,{withCredentials: false}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }


}