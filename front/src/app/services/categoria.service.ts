import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Categoria } from '../interfaces/categoria';


@Injectable({
    providedIn: 'root',
  })
  export class CategoriaService {
  
      constructor(private http: HttpClient) { }
      private baseUrl : string = environment.baseUrl
      private urlGetsPostsCategorias : string = this.baseUrl + environment.getsPostCategorias
      private urlGetUpdateDeleteCategoria : string = this.baseUrl + environment.getUpdateDeleteCategorias



      getCategorias(): Observable<Array<Categoria> | undefined> {
        return this.http.get<Categoria>(this.urlGetsPostsCategorias).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      getCategoria(id:any): Observable<Array<Categoria> | undefined> {
        return this.http.get<Categoria>(this.urlGetUpdateDeleteCategoria+id).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      insertCategoria(categoria:Categoria): Observable<Array<Categoria> | undefined> {
        
        return this.http.post<Categoria>(this.urlGetsPostsCategorias, categoria).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      updateCategoria(categoria:Categoria): Observable<Array<Categoria> | undefined> {
        
        return this.http.put<Categoria>(this.urlGetUpdateDeleteCategoria+categoria.id, categoria).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

      deleteCategoria(id: any): Observable<Array<Categoria> | undefined> {
        return this.http.delete<Categoria>(this.urlGetUpdateDeleteCategoria+id).pipe(
          catchError((error) =>{
            return of(error)
          })
        )
      }

  }