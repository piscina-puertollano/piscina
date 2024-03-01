import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError } from 'rxjs';
import { Puntuacion } from '../interfaces/puntuacion';
import { Entrenamiento } from '../interfaces/entrenamiento';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl
  private urlUpdatePuntuacion: string = this.baseUrl + '/puntuaciones'
  private urlGetPuntuacionId: string = this.baseUrl + '/puntuaciones'
  private urldeletePuntuacion: string = this.baseUrl + '/puntuaciones'
  private urlInsertPuntuacion: string = this.baseUrl + '/puntuaciones'

  getPuntuacionId(puntuacion: Puntuacion): Observable<Array<Puntuacion> | undefined>{
    const url = `${this.urlGetPuntuacionId}/${puntuacion.id}`;
    return this.http.get<any[]>(url);
  }

  updatePuntuacion(puntuacion: Puntuacion): Observable<Puntuacion> {
    const url = `${this.urlUpdatePuntuacion}/${puntuacion.id}`;
    return this.http.put<Puntuacion>(url, puntuacion).pipe(
      catchError((error) => {
        console.error('Error al actualizar la puntuación del usuario:', error);
        throw error;
      })
    )
  }

  insertPuntuacion(puntuacion: Puntuacion): Observable<Entrenamiento> {
    const url = this.urlInsertPuntuacion;
    return this.http.post<Puntuacion>(url, puntuacion).pipe(
      catchError((error) => {
        console.error('Error al insertar la puntuación:', error);
        throw error;
      })
    )
  }
}
