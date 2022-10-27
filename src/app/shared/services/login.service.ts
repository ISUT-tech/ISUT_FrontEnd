import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    isLoginSubject = new BehaviorSubject<boolean>(LoginService.hasToken());
    isLoggedIn: Observable<any>;
    public sessionUser = new BehaviorSubject({});

    setSessionUser(sessionUser: any) {
        this.sessionUser.next(sessionUser);
    }

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {JwtHelperService} _jwtHelper
     * @param {Router} _router
     * @param {UtilityService} _utilityService
     * @param {NavigationService} _navigationService
     */
    constructor(
        private _httpClient: HttpClient,
        public _jwtHelper: JwtHelperService,
        private _router: Router,
        public _utilityService: UtilityService,
        // private _navigationService: NavigationService
    ) {
        // Set the defaults
        this.isLoggedIn = this.isLoginSubject.asObservable();
    }

    /**
     * Method For has token
     */
    private static hasToken(): boolean {
        return !!localStorage.getItem('userToken');
    }

    /**
     * Login
     * 
     * @param data 
     */
    login(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}auth/admin/login
            `, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Log out the user then tell all the subscribers about the new status
     */
    logout(): void {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        this.isLoginSubject.next(false);
        this.setSessionUser({});
        this._router.navigateByUrl("/external/login");
    }

    /**
     * Is Authenticated
     */
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('userToken');
        //Check whether the token is expired and return
        //true or false
        return !this._jwtHelper.isTokenExpired(token);
        //return true;
    }

    checkLoggedin(): void {
        this._httpClient.get(`${environment.apiUrl}loggedin`)
            .subscribe((response: any) => {
                if (response && response.status === 'OK') {
                    localStorage.setItem('userToken', response.data.token);
                    const user = {
                        id: response.data.user_details._id,
                        email: response.data.user_details.email,
                        name: response.data.user_details.firstName,
                        thumbnailProfileImage: "",
                        role: response.data.user_details.role,
                        confirmEmail: response.data.user_details.confirmEmail
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                }
            });
    }
}
