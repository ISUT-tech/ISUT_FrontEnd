import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(
        public _utilityService: UtilityService,
        private _apiService: ApiService
    ) {}

    upload(data: any) {
        return this._apiService.post(data, 'file/upload');
    }

    uploadMultiple(data: any) {
        return this._apiService.post(data, 'file/uploadMultiple');
    }

    get(id) {
        return this._apiService.get(`campaign/getCampaignById/${id}`);
    }

    delete(id) {
        return this._apiService.post(null, `campaign/deleteCampaignById/${id}`);
    }
}
