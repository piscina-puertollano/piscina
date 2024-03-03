/**
 * @author: Marina Laguna
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicios } from '../interfaces/ejercicios';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private http: HttpClient) {  }
  private baseUrl: string = environment.baseUrl;
  private urlListarTiposEjercicios: string = this.baseUrl + '/tiposEjercicios/';

  getTiposEjercicios(): Observable<Array<Ejercicios> |undefined> {
    return this.http.get<any[]>(this.urlListarTiposEjercicios, {withCredentials:true});
  }
}
