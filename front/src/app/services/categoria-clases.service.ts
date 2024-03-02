/**
 * author: Manuel Garcia
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CategoriaClases } from '../interfaces/categoriaClases';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriaClasesService {

  constructor(private http: HttpClient) { }
  private baseUrl : string = environment.baseUrl
  private urAllClases : string = this.baseUrl+'/clases'

  agregarCategoria(nuevaClase: CategoriaClases): Observable<CategoriaClases> {
    return this.http.post<CategoriaClases>(this.urAllClases, nuevaClase).pipe(
      catchError(error => {
        console.error('Error al agregar la clase', error);
        return of(error);
      })
    );
  }

  allCategorias(): Observable<Array<CategoriaClases> | undefined> {
    return this.http.get<CategoriaClases>(this.urAllClases).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
  searchCategoriaClaseId(id:any): Observable<Array<CategoriaClases> | undefined> {
    return this.http.get<CategoriaClases>(this.urAllClases,id).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
  updateCategoriaClase(id: number, Clase: CategoriaClases): Observable<CategoriaClases | undefined> {
    const url = `${this.urAllClases}/${id}`;
    return this.http.put<CategoriaClases>(url, Clase).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }
  
  deleteCategoriaClase(claseId: string): Observable<Array<CategoriaClases> | undefined> {
    const apiUrl = `${this.urAllClases}/${claseId}`;
    return this.http.delete<CategoriaClases>(apiUrl, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}