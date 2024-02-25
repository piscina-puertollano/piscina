import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { EventoUsuario } from '../interfaces/eventoUsuario';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class EventoUsuarioService{

    constructor(private http: HttpClient) { }
    private baseUrl : string = environment.baseUrl
    private urlPostEventoUsuario : string = this.baseUrl + environment.postEventoUsuario 

    insertNoSocio(eventoUsuario:EventoUsuario): Observable<EventoUsuario | undefined> {
        return this.http.post<EventoUsuario>(this.urlPostEventoUsuario, eventoUsuario).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }
}