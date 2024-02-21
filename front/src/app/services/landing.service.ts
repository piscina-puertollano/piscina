import { Injectable } from '@angular/core';
import { Asset, Club } from '../interfaces/landing';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) { }

  urlShow = environment.baseUrl + environment.showClub
  urlAsset = environment.baseUrl + environment.showAsset+'/'
  urlUpdateClub =  environment.baseUrl+environment.indexClub+'/'
  urlIndex = environment.baseUrl+environment.updateclub
  
  index(): Observable<Club | undefined> {
    return this.http.get<Club>(this.urlIndex,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  showSection(section:string): Observable<Club | undefined> {
    return this.http.post<Club>(this.urlShow, {tag:section},{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }


  showAssets(id:number): Observable<Asset | undefined> {
    return this.http.get<Asset>(this.urlAsset+id,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  updateClub(club:Club): Observable<Club | undefined> {
    return this.http.put<Club>(this.urlUpdateClub+club._id,club,{withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

}
