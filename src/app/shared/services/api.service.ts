import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) { }

    /**
      * Post Request
      * 
      * @param json 
      * @param apiUrl 
      */
    post( apiUrl: string, json: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}${apiUrl}`, json,)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
      * Post Request
      * 
      * @param json 
      * @param apiUrl 
      */
     put(json: any, apiUrl: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${environment.apiUrl}${apiUrl}`, json,)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
      * Get Request
      * 
      * @param apiUrl 
      */
    get(apiUrl: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}${apiUrl}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

     /**
      * Get Request
      * 
      * @param apiUrl 
      */
      getNew(apiUrl: string): Observable<any> {
           return this._httpClient.get(`${environment.apiUrl}${apiUrl}`);
    }

    /**
    * Delete Request
    * 
    * @param apiUrl 
    */
    delete(apiUrl: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${environment.apiUrl}${apiUrl}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    uploadFile(formData: any, apiUrl) {
        this._httpClient.post(`${environment.apiUrl}${apiUrl}`, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            catchError(this.errorMgmt)
        )
    }

    /**
     * Error management
     * 
     * @param error 
     */
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}