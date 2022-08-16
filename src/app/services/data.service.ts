import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {map, catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(@Inject(String) private url: string, private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError))
  }

  create(resource: any) {
    console.log(this.url);
    console.log(resource);
    return this.http.post(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  update(resource: any) {
    return this.http.patch(this.url + '/' + resource.id, resource)
      .pipe(catchError(this.handleError))
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.message || 'server Error');
  }
}
