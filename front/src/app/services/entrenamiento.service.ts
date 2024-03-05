/**
 * @author: Marina Laguna
 */
import { EventEmitter, Injectable } from '@angular/core';
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
  private urlListarEntrenamientos : string = this.baseUrl + '/entrenamiento';
  private urlUpdateEntrenamiento : string = this.baseUrl + '/ejercicioEntrenamiento';
  private urlgetEntrenamientoId : string = this.baseUrl + '/ejercicioEntrenamiento';
  private urldeleteEntrenamiento: string = this.baseUrl + '/ejercicioEntrenamiento';
  private urlInsertEntrenamiento: string = this.baseUrl + '/ejercicioEntrenamiento/crear-entrenamiento';

  entrenamientoCreated = new EventEmitter<void>();

  getEntrenamientos(): Observable<Array<Entrenamiento> | undefined> {
    return this.http.get<any[]>(this.urlListarEntrenamientos, {withCredentials:true});
  }

  getEntrenamientoId(entrenamiento: Entrenamiento): Observable<Array<Entrenamiento> | undefined> {
    const url = `${this.urlgetEntrenamientoId}/${entrenamiento.id}`
    return this.http.get<any[]>(url, {withCredentials:true});
  }

  updateEntrenamientos(entrenamiento: Entrenamiento): Observable<Entrenamiento> {
    const url = `${this.urlUpdateEntrenamiento}/${entrenamiento.id}`;
    return this.http.put<Entrenamiento>(url, entrenamiento, {withCredentials:true}).pipe(
      catchError((error) => {
        console.error('Error al actualizar el entrenamiento:', error);
        throw error; 
      })
    );
  }

  deleteEntrenamientos(entrenamiento: Entrenamiento): Observable<Entrenamiento | undefined> {
    const url = `${this.urldeleteEntrenamiento}/${entrenamiento.id}`;  
    return this.http.delete<Entrenamiento>(url, {withCredentials:true}).pipe(
      catchError((error) => {
        console.error('Error al eliminar el entrenamiento:', error);
        throw error;
      })
    );
  }

  insertEntrenamiento(entrenamiento: Entrenamiento): Observable<Entrenamiento> {
    const url = this.urlInsertEntrenamiento;
    return this.http.post<Entrenamiento>(url, entrenamiento, {withCredentials:true}).pipe(
      catchError((error) => {
        console.error('Error al insertar el entrenamiento:', error);
        throw error;
      })
    );
  }
}
