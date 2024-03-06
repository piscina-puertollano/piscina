/**
 * author: Manuel Garcia
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Clase } from '../interfaces/clase';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  constructor(private http: HttpClient) { }
  private baseUrl : string = environment.baseUrl
  private urAllClases : string = this.baseUrl+'/clases'
  private urAllClasesFaltas : string = this.baseUrl+'/recuperar/clases'

  agregarClase(nuevaClase: Clase): Observable<Clase> {
    return this.http.post<Clase>(this.urAllClases, nuevaClase,{withCredentials: true} ).pipe(
      catchError(error => {
        console.error('Error al agregar la clase', error);
        return of(error);
      })
    );
  }

  allClases(): Observable<Array<Clase> | undefined> {
    return this.http.get<Clase>(this.urAllClases, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  allClasesFaltas(): Observable<Array<Clase> | undefined> {
    return this.http.get<Clase>(this.urAllClasesFaltas, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  searchClaseById(id:any): Observable<Array<Clase> | undefined> {
    return this.http.get<Clase>(this.urAllClases,id).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
  updateClase(id: number, Clase: Clase): Observable<Clase | undefined> {
    const url = `${this.urAllClases}/${id}`;
    return this.http.put<Clase>(url, Clase, {withCredentials: true}).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }
  
  deleteclase(claseId: string): Observable<Array<Clase> | undefined> {
    const apiUrl = `${this.urAllClases}/${claseId}`;
    return this.http.delete<Clase>(apiUrl, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}