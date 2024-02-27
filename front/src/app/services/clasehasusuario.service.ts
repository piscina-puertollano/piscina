/**
 * author: Manuel García
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
  private urlEliminarRelacion: string = this.baseUrl + '/eliminar/clase/usuario';
  private urlObtener: string = this.baseUrl + '/obtener/clases';


  allRelacion(): Observable<Array<claseUsuario> | undefined> {
    return this.http.get<claseUsuario>(this.urlObtener).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  agregarRelacion(nuevaClase: claseUsuario): Observable<claseUsuario> {
    return this.http.post<claseUsuario>(this.urlRelacion, nuevaClase).pipe(
      catchError((error) => {
        console.error('Error al agregar la clase', error);
        return of(error);
      })
    );
  }

  deleteRelacion(faltaId: string): Observable<Array<claseUsuario> | undefined> {
    const apiUrl = `${this.urlEliminarRelacion}/${faltaId}`;
    return this.http.delete<claseUsuario>(apiUrl).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}
