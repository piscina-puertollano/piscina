import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Entrenamiento } from '../interfaces/entrenamiento';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  constructor(private http: HttpClient) { }
  private baseUrl : string = environment.baseUrl
  private urlListarEntrenamientos : string = this.baseUrl + '/listar-entrenamientos'
  private urlUpdateEntrenamiento : string = this.baseUrl + '/actualizar-entrenamiento'
  private urlgetEntrenamientoId : string = this.baseUrl + '/listar-entrenamiento'

  getEntrenamientos(): Observable<Array<Entrenamiento> | undefined> {
    return this.http.get<any[]>(this.urlListarEntrenamientos);
  }

  getEntrenamientoId(entrenamiento: Entrenamiento): Observable<Array<Entrenamiento> | undefined> {
    const url = `${this.urlgetEntrenamientoId}/${entrenamiento.id}`
    return this.http.get<any[]>(url);
  }

  updateEntrenamientos(entrenamiento: Entrenamiento): Observable<Entrenamiento> {
    const url = `${this.urlUpdateEntrenamiento}/${entrenamiento.id}`;
    return this.http.put<Entrenamiento>(url, entrenamiento).pipe(
      catchError((error) => {
        console.error('Error al actualizar el entrenamiento:', error);
        throw error; 
      })
    );
  }


  /* deleteEntrenamientos(id: any): Observable<Array<Entrenamiento> | undefined>{
    return 
  } */
}
