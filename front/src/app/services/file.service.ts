import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { File } from '../interfaces/upload';

/**
 * @author: badr
 */

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  url = environment.baseUrl+environment.file

  showImage(image: File):Observable<Blob|undefined> {
    return this.http.post(this.url+'/'+image.id,{folder:image.where},{responseType: 'blob'}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  deleteImage(image: File):Observable<File|undefined> {
    let urldelete = this.url+'/'+image.id+'/'+image.where
    return this.http.delete(urldelete).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }



showPdf(pdf: File):Observable<Blob|undefined> {
  console.log(this.url+'/'+pdf.id)
  return this.http.post(this.url+'/'+pdf.id,{folder:pdf.where},{responseType: 'blob'}).pipe(
    catchError((error) =>{
      return of(error)
    })
  )
}



}