import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  constructor(private http: HttpClient) { }
  private baseUrl : string = environment.baseUrl
  private urlListarEntrenamientos : string = this.baseUrl + '/listar-entrenamientos'

  getEntrenamientos(): Observable<any[]> {
    return this.http.get<any[]>(this.urlListarEntrenamientos);
  }
}
