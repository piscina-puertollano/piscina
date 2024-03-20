import { Injectable } from '@angular/core';
import { Asset, Club, Contact } from '../interfaces/landing';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
/**
 * @author: badr
 */

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) { }

  urlShow = environment.baseUrl + environment.showClub
  urlAsset = environment.baseUrl + environment.showAsset+'/'
  urlUpdateClub =  environment.baseUrl+environment.indexClub+'/'
  urlIndex = environment.baseUrl+environment.updateclub
  urlContact = environment.baseUrl+environment.indexContact

  urlShowContact = environment.baseUrl + environment.showContact
  
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
    return this.http.put<Club>(this.urlUpdateClub+club._id,club,{withCredentials:true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  getContact(): Observable<Array<Contact> | undefined> {
    return this.http.get<Contact>(this.urlShowContact, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  showContact(id:number): Observable<Contact | undefined> {
    return this.http.get<Contact>(this.urlContact+'/'+id, {withCredentials:false}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  createContact(contact:Contact): Observable<Contact | undefined> {
    return this.http.post<Contact>(this.urlContact, contact, {withCredentials:true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  updateContact(contact:Contact): Observable<Contact | undefined> {
    return this.http.put<Contact>(this.urlContact+'/'+contact._id, contact, {withCredentials:true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  deleteContact(id:number): Observable<Contact | undefined> {
    return this.http.delete<Contact>(this.urlContact+'/'+id, {withCredentials:true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

}
