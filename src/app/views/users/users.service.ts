import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService
{

    displayedColumns: string[] = [
      "profileImage", 
        "fullName",
        "mobileNumber",
        "createdAt",
        "status",
        "action",

   
      ];
    formGroup: FormGroup;

    constructor(public _apiService: ApiService, public formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            fullName: ["", [Validators.required]],
            mobileNumber: ["", [Validators.required]],
            email: ["", [Validators.required]],
       
        });


      }
      statusUser(id, active) {
        return this._apiService.post(
          `customer/active?id=${id}&active=${active}`,
          null
          
        );
      }
    
    getData(data): Promise<any> {
        return this._apiService.post(
          "customers/pagination/filter",
          data
        );
      }
      addUser(data): Promise<any> {
        return this._apiService.post("admin/add", data);
      }


      deleteById(id): Promise<any> {
        return this._apiService.delete(`customer/${id}/delete`);
      }
      // getUserDetail(id): Promise<any> {
      //   return this._apiService.get(`user/getUserDetailsById?id=${id}`);
      // }
    
      // getBookingList(id) {
      //   return this._apiService.get(`booking/getBookingListByUserId?userId=${id}`);
      // }
}
