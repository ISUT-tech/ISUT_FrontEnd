import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService implements Resolve<any>{
    data: any;
    routeParams: any;
    state: string;

    constructor(
        public _utilityService: UtilityService,
        private _apiService: ApiService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        this.state = state.url;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getForResolve()
            ]).then(
                () => {
                    // resolve();
                },
                reject
            );
        });
    }

    getForResolve(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getData().then((response: any) => {
                this.data = response.data;
                resolve(response);
            }, reject);
        });
    }

    getData():any {
        return this._apiService.get(`cabs`)
    }
    booking():any {
        return this._apiService.get(`customer/{id}/bookings`)
    }
    driverList():any {
        return this._apiService.get(`customer/3`)
    }
    userList():any {
        return this._apiService.get(`customer/1`)
    }
}

