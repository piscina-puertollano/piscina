import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Files } from '../interfaces/upload';

/**
 * @author: badr
 */

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  url = environment.baseUrl+environment.file

  saveImage(image: FormData, where: string): Observable<any | undefined> {

    return this.http.post(this.url,image,{
       headers: { 
        'folder': where
      },
       withCredentials: true
    }).pipe(
       catchError((error) => {
         return of(error);
       })
    );
   }
   

  showImage(image: Files):Observable<Blob|undefined> {
    return this.http.post(this.url+'/'+image.id,{folder:image.where},{responseType: 'blob'}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }

  deleteImage(image: Files):Observable<Files|undefined> {
    let urldelete = this.url+'/'+image.id+'/'+image.where
    return this.http.delete(urldelete, {withCredentials: true}).pipe(
      catchError((error) =>{
        return of(error)
      })
    )
  }



showPdf(pdf: Files):Observable<Blob|undefined> {
  console.log(this.url+'/'+pdf.id)
  return this.http.post(this.url+'/'+pdf.id,{folder:pdf.where},{responseType: 'blob'}).pipe(
    catchError((error) =>{
      return of(error)
    })
  )
}



}