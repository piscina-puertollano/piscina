/**
 * author: Manuel Garcia
 */
import { claseUsuario } from './../interfaces/claseUsuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClasehasusuarioService {

  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;
  private urlRelacion: string = this.baseUrl + '/asignar/clase/usuario';
  private urlActulizarRelacion: string = this.baseUrl + '/actualizar/clase/usuario';
  private urlEliminarRelacion: string = this.baseUrl + '/eliminar/clase/usuario';
  private urlObtener: string = this.baseUrl + '/obtener/clases';
  private urlObtenerRecuperar: string = this.baseUrl + '/obtener/clases';


  allRelacion(): Observable<Array<claseUsuario> | undefined> {
    return this.http.get<claseUsuario>(this.urlObtener, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  allRelaciones(): Observable<Array<claseUsuario> | undefined> {
    return this.http.get<claseUsuario>(this.urlObtenerRecuperar, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  agregarRelacion(nuevaClase: claseUsuario): Observable<claseUsuario> {
    return this.http.post<claseUsuario>(this.urlRelacion, nuevaClase, {withCredentials: false}).pipe(
      catchError((error) => {
        console.error('Error al agregar la clase', error);
        return of(error);
      })
    );
  }

  
  actualizarRelacion(id: number, claseUsuario: claseUsuario): Observable<claseUsuario | undefined> {
    const url = `${this.urlActulizarRelacion}/${id}`;
    return this.http.put<claseUsuario>(url, claseUsuario, {withCredentials: true}).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }

  deleteRelacion(faltaId: string): Observable<Array<claseUsuario> | undefined> {
    const apiUrl = `${this.urlEliminarRelacion}/${faltaId}`;
    return this.http.delete<claseUsuario>(apiUrl, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}
