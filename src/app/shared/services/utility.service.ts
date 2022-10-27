import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { formatDate } from '@angular/common';
import { environment } from '../../../environments/environment.prod';
import { ConstantService } from './constants.service';
import { Pagination } from '../shared-components/interfaces/pagination.interface';


@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    apiUrl: string = environment.apiUrl;
    defaultProfileImage = '/assets/images/no-image.jpg';
    defaultNewsImage = '/assets/images/no-image.jpg';
    defaultCabImage = '/assets/images/car.png';
    defaultLogoImage = '/assets/images/dummy_logo.png';
    pagination: Pagination = { totalPages: 0, totalCount: 0, currentPage: 1, perPage: 10, data: [] };
    userRoleList: any = [];
    genderList: any = [];
    registrationFeeStatusList: any;
    matchStatusList: any[] = [];
    defaultFormImage: any = '/assets/images/no-image.jpg';
    
    constructor(
        public _matSnackBar: MatSnackBar,
        private _constantService: ConstantService
    ) {
        this.userRoleList = this._constantService.SALUTATION_LIST;
        this.genderList = this._constantService.GENDER_LIST;
    }

    onImgError(event) {
        event.target.src = this.getImage(null);
    }

    getImage(profileImage: any): any {
        let url = this.apiUrl + 'file/getImage/';
        if (profileImage !== null && profileImage !== '') {
            url += profileImage;
        } else {
            url = this.defaultFormImage;
        }
        return url;
    }

    validateEmail(email): boolean {
        var x = email;
        var atposition = x.indexOf("@");
        var dotposition = x.lastIndexOf(".");
        if (atposition < 1 || dotposition < atposition + 2
            || dotposition + 2 >= x.length) {
            this.openMatSnackBar('Please enter a valid e-mail address ', 'Try Again');
            return false;
        } else {
            return true;
        }
    }
    getFormatedDateTime(date): any {
        return formatDate(date, 'MMM d, yyyy hh:mm aa', 'en-US', '+0530');
    }
    getFormatedDate(date: any): string {
        return formatDate(date, 'MMM d, yyyy', 'en-US', '+0530');
    }
    getDownloadFileUrl(file): string {
        let url = this.apiUrl + 'file/download/';
        if (file !== '') {
            url += file;
        }
        return url;
    }

    getImageUrl(file,type): string {
        let url = this.apiUrl + 'file/getImage/';
        if (file !== null && file !== '' && file !== undefined) {
            url += file;
        } else {
           if(type === 'user') url = this.defaultProfileImage;
           if(type === 'cab') url = this.defaultCabImage;
           else url = this.defaultProfileImage;
        }
        return url;
    }
    getLogoImageUrl(file): string {
        let url = this.apiUrl + 'file/getFile/';
        if (file !== null && file !== '' && file !== undefined) {
            url += file;
        } else {
            url = this.defaultLogoImage;
        }
        return url;
    }
    openMatSnackBar(message, status) {
        this._matSnackBar.open(message, status, {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }
    getUserRole(role: any) {
        var item = this.userRoleList.find(item => item.id === role);
        return item.value;
    }

    getGender(gender: any): any {
        var item = this.genderList.find(item => item.id === gender);
        return item.value;
    }

    calculateAge(birthMonth, birthDay, birthYear) {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var currentDay = currentDate.getDate();
        var calculatedAge = currentYear - birthYear;

        if (currentMonth < birthMonth - 1) {
            calculatedAge--;
        }
        if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
            calculatedAge--;
        }
        return calculatedAge;
    }
    monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
    diff_years(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    }

    getTeamManagerStatus(leagues, leagueId) {
        if (leagues) {
            let element = leagues.find(item => item.id === leagueId);
            if (element) {
                if (element.status === 0) {
                    return 'Pending';
                } else if (element.status === 1) {
                    return 'Approved';
                } else if (element.status === 2) {
                    return 'Rejected';
                }
            }
        }
        return 'Pending';
    }

    getStatusColor(leagues, leagueId) {
        if (leagues) {
            let element = leagues.find(item => item.id === leagueId);
            if (element) {
                if (element.status === 0) {
                    return 'accent';
                } else if (element.status === 1) {
                    return 'primary';
                } else if (element.status === 2) {
                    return 'warn';
                }
            }
        }
        return 'accent';
    }
    getSerialNumber(index, pagination) {
        return ((pagination.currentPage - 1) * pagination.perPage) + (index + 1);
    }
}
