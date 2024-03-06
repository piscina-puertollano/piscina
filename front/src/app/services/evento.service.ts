// Gonzalo Martinez Haro
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Evento } from '../interfaces/eventos';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {

    constructor(private http: HttpClient) { }
    private baseUrl : string = environment.baseUrl
    private urlGetEventos : string = this.baseUrl + environment.getsPostEvento
    private urlGetEvento : string = this.baseUrl + environment.getUpdateDeleteEvento
    private urlUpdateEvento : string = this.baseUrl + environment.getUpdateDeleteEvento
    private urlDeleteEvento : string = this.baseUrl + environment.getUpdateDeleteEvento
    private urlInsertEvento : string = this.baseUrl + environment.getsPostEvento
    private urlGetsEventosVisibles : string = this.baseUrl + environment.getEventosVisibles

    
    getEventos(): Observable<Array<Evento> | undefined> {
        return this.http.get<Evento>(this.urlGetEventos,{withCredentials: true}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      getEventosVisibles(): Observable<Array<Evento> | undefined> {
        console.log('asdf')
        return this.http.get<Evento>(this.urlGetsEventosVisibles).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      getEvento(id:any): Observable<Evento | undefined> {
        return this.http.get<Evento>(this.urlGetEvento+id/*,{withCredentials: true}*/).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      insertEvento(evento:Evento): Observable<Evento | undefined> {
        
        return this.http.post<Evento>(this.urlInsertEvento, evento,{withCredentials: true}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      updateEvento(evento:Evento): Observable<Array<Evento> | undefined> {
        
        return this.http.put<Evento>(this.urlUpdateEvento+evento.id, evento,{withCredentials: true}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      deleteEvento(id: any): Observable<Array<Evento> | undefined> {
        return this.http.delete<Evento>(this.urlDeleteEvento+id,{withCredentials: true}).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

    /*
  private eventos: Evento[] = [
    { id: 1, nombre: 'Natación', fecha: '2024-05-20', lugar: 'Online' },
    { id: 2, nombre: 'Nadar', fecha: '2024-05-21', lugar: 'Online' },
    
  ];

  getEventos(): Evento[] {
    return this.eventos;
  }*/

}
