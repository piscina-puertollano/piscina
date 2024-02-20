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

  allClases(): Observable<Array<Clase> | undefined> {
    return this.http.get<Clase>(this.urAllClases).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  searchClaseById(id:any): Observable<Array<Clase> | undefined> {
    return this.http.post<Clase>(this.urAllClases,id,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  updateClase(Clase:Clase): Observable<Array<Clase> | undefined> {
    return this.http.put<Clase>(this.urAllClases, Clase).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }
}
