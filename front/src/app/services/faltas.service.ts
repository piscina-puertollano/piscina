/**
 * author: Manuel Garcia
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Faltas } from '../interfaces/faltas';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FaltasService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;
  private urlAsignarFaltas: string = this.baseUrl + '/faltas';

  allFaltas(): Observable<Array<Faltas> | undefined> {
    return this.http.get<Faltas>(this.urlAsignarFaltas, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  agregarFalta(nuevaClase: Faltas): Observable<Faltas> {
    return this.http.post<Faltas>(this.urlAsignarFaltas, nuevaClase, {withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Error al agregar la clase', error);
        return of(error);
      })
    );
  }

  actualizarFaltas(id: number, faltaUsuario: Faltas): Observable<Faltas| undefined> {
    const url = `${this.urlAsignarFaltas}/${id}`;
    return this.http.put<FaltasService>(url, faltaUsuario, {withCredentials: true}).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }
  deleteFaltas(faltaId: string): Observable<Array<Faltas> | undefined> {
    const apiUrl = `${this.urlAsignarFaltas}/${faltaId}`;
    return this.http.delete<Faltas>(apiUrl, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}
