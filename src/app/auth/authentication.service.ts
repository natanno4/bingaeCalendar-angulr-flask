import { Injectable } from '@angular/core';

import { Observable, of, from, throwError } from 'rxjs';
import { tap, delay, map, catchError, timeout } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '../models/response'
import {environment} from 'src/environments/environment'
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  constructor(private http: HttpClient){
    this.currentUser = <User>JSON.parse(localStorage.getItem("user")); 
  }

  currentUser : User 
  redirectUrl: string;
  responseMessage : string;

  login(email : string, password : string): Observable<boolean> {
    let url = `${environment.apiUrl}login`;
    const formdata : FormData = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    return this.http.post<Response>(url, formdata).pipe(
      map(data  =>{
        this.responseMessage = data.message;
        if (data.error || data.value === null){
          return false;
        }
        this.currentUser = data.value
        localStorage.setItem('user', JSON.stringify(this.currentUser))
        return true;
      
      },catchError(this.handleError)),tap(whatever => console.log(whatever)));
     
  }

  register(email : string, password : string, firstName: string, lastName:string, phone :string)
  : Observable<boolean>{
    let url = `${environment.apiUrl}register`;
    const formdata : FormData = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);
    formdata.append('phone_number', phone);
    return this.http.post<Response>(url, formdata).pipe(
      map(data  =>{
        this.responseMessage = data.message;
        if (data.error || data.value === null){
          return false;
        }
        return true;
      
      },catchError(this.handleError)),tap(whatever => console.log(whatever)));  
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("user");
  }

  isLoggedIn(): boolean{
    return this.currentUser != null;
  }

  getResponseMessage() : string{
    return this.responseMessage;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}