import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
   url = environment.baseUrl+environment.myProfile

  getUserByToken():Observable< User|undefined>{
    return this.http.get(this.url, {withCredentials: true})
  }

   isLoggedIn(): boolean {
    const user = this.getCurrentUser();
    return user !== null;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
