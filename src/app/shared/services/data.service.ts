import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        private _apiService: ApiService,
        private _httpClient: HttpClient
    ) { }

    // addFile(data: any) {
    //     return this._apiService.post(data, 'uploadFile');
    // }

    getExecutorListWithPagination(json) {
        return this._apiService.post(json, 'getAllScheduledData');
    }

    /**
       * Upload Image
       * 
       * @param formData 
       */
    addFile(formData: any): Observable<any> {
        return this._httpClient.post(`${environment.apiUrl}uploadFile`, formData, {
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

    getPeopleFinder(pagination: any) {
        return this._apiService.post(pagination, 'googleMap/getGoogleBussinessData');
    }

    exportExcel(pagination: any) {
        return this._apiService.post(pagination, 'googleMap/exportData');
    }

    killThread() {
        return this._apiService.put(null, 'thread/process/killThread');
    }

    deleteThreadById(id: any) {
        return this._apiService.delete(`deleteScheduledDataById/${id}`);
    }

    getKeyword() {
        return this._apiService.get('keyword/getKeyword');
    }

    addKeyword(json) {
        return this._apiService.post(json, 'keyword/addKeyword');
    }

    deleteAll() {
        return this._apiService.delete('thread/process/deleteAll');
    }
}
